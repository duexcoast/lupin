const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);

module.exports = (app) => {
  app.post('/create-checkout-session', async (req, res) => {
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
};
