const { session } = require('passport');
const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const User = mongoose.model('users');
module.exports = (app) => {
  app.post('/api/create-checkout-session', async (req, res) => {
    const customer = await stripe.customers.create({
      metadata: {
        userId: req.user.googleId,
      },
    });

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          //Provide the exact price ID of the product you want to sell
          price: 'price_1LWP3mHsCK3aU538kmRG4vkZ',
          quantity: 5,
        },
      ],
      customer: customer.id,
      mode: 'payment',
      success_url: 'http://localhost:3000?success=true',
      cancel_url: 'http://localhost:3000?canceled=true',
    });

    res.redirect(303, session.url);
  });

  const fulfillOrder = async (userId, session) => {
    const existingUser = await User.findOne({ googleId: userId });
    existingUser.credits += 5;
    existingUser.save();
  };

  app.post(
    '/api/webhook',
    bodyParser.raw({ type: 'application/json' }),
    async (req, res) => {
      const sig = req.headers['stripe-signature'];
      const payload = req.body;

      let event;

      try {
        event = stripe.webhooks.constructEvent(
          req.body,
          sig,
          keys.stripeWebhookSecret
        );
      } catch (err) {
        console.log('webhook error:', err.message);
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
      }
      //Handle the event
      switch (event.type) {
        case 'checkout.session.completed':
          const session = event.data.object;
          const {
            metadata: { userId },
          } = await stripe.customers.retrieve(session.customer);
          console.log(userId);
          fulfillOrder(userId, session);
          break;

        // TODO: ... handle other event types
        default:
        // console.log(`Unhandled event type ${event.type}`);
      }

      // Return a 200 response to acknowledge receipt of the event
      // .end() is necessary here.
      res.status(200).end();
    }
  );
};
