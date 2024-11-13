import './App.css';
import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import SubscriptionDetails from './components/SubscriptionDetails/SubscriptionDetails';

function App() {
  const [subscriptions, setSubscriptions] = useState([])
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchAllSubscriptions();
  }, [])

  const fetchAllSubscriptions = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/subscriptions');
      if (response.ok) {
        const data = await response.json();
        const subscriptionsArray = data.data.map(subscription => ({
          id: subscription.id,
          ...subscription.attributes}));
        setSubscriptions(subscriptionsArray);
      } else {
        console.error('Response was not ok:', await response.text());
        setErrorMessage('Failed to fetch subscriptions data');
      }
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
      setErrorMessage('An error occurred while fetching subscriptions data');
    }
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home subscriptions={subscriptions} setSubscriptions={setSubscriptions}/>} />
        <Route path="/subscriptions/:id" element={<SubscriptionDetails/>} />
        <Route path="*" element={<h2>Nothing here - please go back!</h2>} />
      </Routes>
    </div>
  );
}

export default App;
