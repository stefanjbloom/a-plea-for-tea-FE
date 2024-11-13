import './SubscriptionDetails.css'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { imagesToIds } from '../../data/teaImages';

const SubscriptionDetails = () => {

  const { id } = useParams();
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    fetchASubscription(id);
  }, [id]);

  function fetchASubscription(subscriptionId) {
    fetch(`http://localhost:3000/api/v1/subscriptions/${subscriptionId}`)
      .then(response => response.json())
      .then(data => setSubscription(data.data))
      .catch(error => console.error("Error :", error))
  };

  if (!subscription) return <p>Loading subscription details...</p>;

  const subscriptionImage = imagesToIds[Number(subscription.id)];

  return (
    <div className='subscription-overlay'>
      <h2 className='subscription-title'>{subscription.attributes.title} Subscription</h2>

        <img src={subscriptionImage} alt="tea" />

      <ul className='subscription-list'>
        <li className='subscription-price'>Price: {subscription.attributes.price}</li>
        <li className='subscription-status'>Status: {subscription.attributes.status}</li>
      </ul>
    </div>
  )

};
export default SubscriptionDetails;