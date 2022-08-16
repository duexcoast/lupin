import React, { useState, useEffect } from 'react';
import Message from './Message';
import CheckoutButton from './CheckoutButton';

export default function CheckoutHeader() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    //check to see if this is a rediect back from checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get('status') === 'success') {
      setMessage('Order placed!');
    }

    if (query.get('status') === 'cancel') {
      setMessage('Order canceled.');
    }
  }, []);

  return message ? <Message message={message} /> : <CheckoutButton />;
}
