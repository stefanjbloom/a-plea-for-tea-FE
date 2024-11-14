import "./SubscriptionDetails.css";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { imagesToIds } from "../../data/teaImages";
import homeIcon from "../../data/icons/home.png";

const SubscriptionDetails = () => {
  const { id } = useParams();
  const [subscription, setSubscription] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchASubscription(id);
  }, [id]);

  function fetchASubscription(subscriptionId) {
    fetch(`http://localhost:3000/api/v1/subscriptions/${subscriptionId}`)
      .then((response) => response.json())
      .then((data) => setSubscription(data.data))
      .catch((error) => console.error("Error :", error));
  }

  function cancelSubscription(id) {
    fetch(`http://localhost:3000/api/v1/subscriptions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subscription: {
          status: "canceled",
        },
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsModalOpen(false);
        setSubscription(data.data);
      })
      .catch((error) =>
        console.error("Error occurred while cancelling:", error)
      );
  }

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleHomeClick = () => {
    navigate("/");
  };
  if (!subscription) return <p>Loading subscription details...</p>;

  const subscriptionImage = imagesToIds[Number(subscription.id)];

  return (
    <div className="subscription-overlay">
      <h2 className="subscription-title">
        {subscription.attributes.title} Subscription
      </h2>
      <button className="home-button" onClick={handleHomeClick}>
        <img src={homeIcon} alt="Go Home" className="home-icon" />
      </button>
      <img className='image' src={subscriptionImage} alt="tea" />
      <ul className="subscription-list">
        <li className="subscription-price">
          Price: {subscription.attributes.price}
        </li>
        <li className="subscription-status">
          Status: {subscription.attributes.status}
        </li>
      </ul>
      <ul className="customer-list">
        <li className="customer-name">
          Customer Name: {subscription.attributes.customer.firstname}{" "}
          {subscription.attributes.customer.lastname}
        </li>
        <li className="customer-email">
          Email: {subscription.attributes.customer.email}
        </li>
        <li className="customer-address">
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

      <button className="cancel-button" onClick={() => setIsModalOpen(true)}>
        Click to Toggle Subscription
      </button>

      {isModalOpen && (
        <div>
          <h2 className="modal-header">
            Are you sure you'd like to activate/cancel?
          </h2>
          <button
            className="yes-cancel"
            onClick={() => cancelSubscription(subscription.id)}
          >
            {" "}
            Yes
          </button>
          <button className="no-cancel" onClick={closeModal}>
            {" "}
            No
          </button>
        </div>
      )}
    </div>
  );
};
export default SubscriptionDetails;
