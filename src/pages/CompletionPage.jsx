import { useEffect, useState } from 'react';

export default function CompletionPage() {
  const [message, setMessage] = useState('Checking payment...');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const status = params.get('redirect_status'); // present for some methods
    const intent = params.get('payment_intent');

    if (status === 'succeeded') {
      setMessage('Payment succeeded!');
    } else if (status === 'failed') {
      setMessage('Payment failed.');
    } else {
      setMessage('Processing payment...');
    }

    // optionally, call your backend to confirm order by intent ID
  }, []);

  return <div>{message}</div>;
}
