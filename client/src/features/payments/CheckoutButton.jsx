import React from 'react';

export default function CheckoutButton() {
  return (
    <form action='/api/create-checkout-session' method='POST'>
      <button className='' type='submit'>
        Buy Credits
      </button>
    </form>
  );
}
