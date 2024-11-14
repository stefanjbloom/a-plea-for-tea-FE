import "./SubscriptionDetails.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { imagesToIds } from "../../data/teaImages";

const SubscriptionDetails = () => {
  const { id } = useParams();
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    fetchASubscription(id);
  }, [id]);

  function fetchASubscription(subscriptionId) {
    fetch(`http://localhost:3000/api/v1/subscriptions/${subscriptionId}`)
      .then((response) => response.json())
      .then((data) => setSubscription(data.data))
      .catch((error) => console.error("Error :", error));
  }

  if (!subscription) return <p>Loading subscription details...</p>;

  const subscriptionImage = imagesToIds[Number(subscription.id)];

  return (
    <div className="subscription-overlay">
      <h2 className="subscription-title">
        {subscription.attributes.title} Subscription
      </h2>
      <img src={subscriptionImage} alt="tea" />
      <ul className="subscription-list">
        <li className="subscription-price">
          Price: {subscription.attributes.price}
        </li>
        <li className="subscription-status">
          Status: {subscription.attributes.status}
        </li>
      </ul>
      <ul className="customer-list">
        <li className="customer-price">
          Customer Name: {subscription.attributes.customer.firstname}{" "}
          {subscription.attributes.customer.lastname}
        </li>
        <li className="customer-status">
          Email: {subscription.attributes.customer.email}
        </li>
        <li className="customer-status">
          Address: {subscription.attributes.customer.address}
        </li>
      </ul>
      <ul className="tea-list">
        <li className="tea-title">Tea: {subscription.attributes.tea.title}</li>
        <li className="tea-description">
          Tasting Notes: {subscription.attributes.tea.description}
        </li>
        <li className="tea-description">
          Steeping Temp: {subscription.attributes.tea.temperature} *F
        </li>
        <li className="tea-description">
          Brewtime: {subscription.attributes.tea.brewtime} minutes
        </li>
      </ul>
    </div>
  );
};
export default SubscriptionDetails;
