import './SubscriptionDetails.css'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const SubscriptionDetails = () => {

  const { id } = useParams();
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    fetchASubscription(id);
  }, [id]);

  function fetchASubscription(subscriptionId) {
    fetch(`http://localhost:3000/api/v1/subscriptions/${subscriptionId}`)
      .then(response => response.json())
      .then(data => setSubscription(data.data.attributes))
      .catch(error => console.error("Error :", error))
  };

  if (!subscription) return <p>Loading subscription details...</p>;

  return (
    <div className='subscription-overlay'>
      <h2 className='subscription-title'>{subscription.title}</h2>
      <ul className='subscription-list'>
        <li className='subscription-price'>Price: {subscription.price}</li>
        <li className='subscription-status'>Status: {subscription.status}</li>
      </ul>
    </div>
  )

};
export default SubscriptionDetails;