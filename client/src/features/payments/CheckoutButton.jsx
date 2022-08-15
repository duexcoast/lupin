import React from 'react';

export default function CheckoutButton() {
  return (
    <form action='/api/create-checkout-session' method='POST'>
      <button type='submit'>Buy Credit</button>
    </form>
  );
}
