import "./Home.css";
import teapotIcon from "../../data/icons/teapot.png";
import { imagesToIds } from "../../data/teaImages";
import { useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";

const Home = ({ subscriptions, setSubscriptions, allSubscriptions }) => {
  const navigate = useNavigate();

  return (
    <main className="home-main">
      <SearchBar
        subscriptions={subscriptions}
        setSubscriptions={setSubscriptions}
        allSubscriptions={allSubscriptions}
      />
      <div className="home-div">
        <h1 className="home-header">
        <img className="tea-icon" alt="Teapot Icon" src={teapotIcon}></img>
          A Plea for Tea Subscription Service
        <img className="tea-icon" alt="Teapot Icon" src={teapotIcon}></img>
        </h1>
        <h2>Click a Card to get Subscription Info!</h2>
        <div className="subscription-list">
          {subscriptions.map((subscription) => {
            const subscriptionImage = imagesToIds[subscription.id];
            return (
              <div
                className="subscription-index"
                key={subscription.id}
                onClick={() => navigate(`/subscriptions/${subscription.id}`)}
              >
                <h3 className="subscription-title">{subscription.title}</h3>
                <h4 className="subscription-price">
                  {subscription.price}/{subscription.frequency}
                </h4>
                {subscriptionImage && (
                  <img
                    className="subscription-image"
                    src={subscriptionImage}
                    alt="Tea"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};
export default Home;
