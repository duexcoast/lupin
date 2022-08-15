const { session } = require('passport');
const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const bodyParser = require('body-parser');

module.exports = (app) => {
  app.post('/api/create-checkout-session', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          //Provide the exact price ID of the product you want to sell
          price: 'price_1LVyuBHsCK3aU538iiDW1flA',
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3000?success=true',
      cancel_url: 'http://localhost:3000?canceled=true',
    });

    res.redirect(303, session.url);
  });

  const fulfillOrder = async (userId, session) => {
    const existingUser = await User.findOne({ googleId: userId });
    console.log(existingUser);
    existingUser.credits += 5;
    existingUser.save();
  };

  app.post(
    '/api/webhook',
    bodyParser.json({ type: 'application/json' }),
    (req, res) => {
      const sig = req.headers['stripe-signature'];
      const payload = req.body;
      console.log('PAYLOAD:', payload.type, payload);

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

          // fulfill the purchase
          fulfillOrder(session);

        // TODO: ... handle other event types
        default:
          console.log(`Unhandled event type ${event.type}`);
      }

      // Return a 200 response to acknowledge receipt of the event
      res.status(200);
    }
  );

  app.get('/api/secret', async (req, res) => {
    const intent = await // ... Fetech or create the PaymentIntent
    res.json({ client_secret: intent.client_secret });
  });
};
