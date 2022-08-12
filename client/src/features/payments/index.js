import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

export default function Payments() {
  return (<StripeCheckout
    amount={500}
    token={token => console.log(token)}
    stripeKey={import.meta.env.VITE_APP_STRIPE_KEY}
  />)
}
