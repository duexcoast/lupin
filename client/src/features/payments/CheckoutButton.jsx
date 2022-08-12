import React from 'react';

export default function CheckoutButton() {
  return (
    <form action='/create-checkout-session' method='POST'>
      <button type='submit'>Buy Credits</button>
    </form>
  );
}
