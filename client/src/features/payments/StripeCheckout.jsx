import React, { useState } from 'react';

const stripePromise = loadStripe(import.meta.env.VITE_APP_STRIPE_KEY);

export default function index() {
  const [clientSecret, setClientSecret] = useState('');

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return <div>
    <Elements options={options} stripe={stripePromise}>
      
    </Elements>
  </div>;
}
