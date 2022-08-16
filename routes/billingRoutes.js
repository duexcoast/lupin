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
          quantity: 1,
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
      console.log('PAYLOAD:', payload.type);

      let event;

      try {
        event = stripe.webhooks.constructEvent(
          req.body,
          sig,
          keys.stripeWebhookSecret
        );
      } catch (err) {
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
      }

      //Handle the event
      switch (event.type) {
        case 'payment_intent.succeeded':
          const paymentIntent = event.data.object;
          //Then define and call a function to handle the event
          break;
        case 'checkout.session.completed':
          const session = event.data.object;
          console.log('The checkout session is completed');

          // retrieve the customer meta data, which has the googleId
          const {
            metadata: { userId },
          } = await stripe.customers.retrieve(session.customer);

          fulfillOrder(userId, session);

          break;

        default:
          console.log(`Unhandled event type ${event.type}`);
      }

      // Return a 200 response to acknowledge receipt of the event
      res.status(200).end();
    }
  );

  app.get('/api/secret', async (req, res) => {
    const intent = await // ... Fetech or create the PaymentIntent
    res.json({ client_secret: intent.client_secret });
  });
};
