import './Home.css'
import teapotIcon from '../../data/icons/teapot.png'
import mintImage from '../../data/images/mint_tea.jpeg';
import matchaImage from '../../data/images/matcha.jpeg';
import tulsiImage from '../../data/images/tulsi.jpeg';
import SearchBar from '../SearchBar/SearchBar'
import { useNavigate } from 'react-router-dom'

const Home = ({ subscriptions, setSubscriptions }) => {

  const navigate = useNavigate();
  console.log("Subscriptions array:", subscriptions);

  const imagesToIds = {
    2: matchaImage,
    3: tulsiImage,
    4: mintImage
  }

  return(
    <main className='home-main'>
      <SearchBar subscriptions={subscriptions} setSubscriptions={setSubscriptions}/>
      <div className='home-div'>
        <h1 className='home-header'>A Plea for Tea Subscription Service</h1>
          <img className='tea-icon' alt='Teapot Icon' src={teapotIcon}></img>
        <div className='subscription-list'>
          {subscriptions.map((subscription) => {
            const subscriptionImage = imagesToIds[subscription.id];
           return (
            <div 
              className='subscription-index'
              key={subscription.id}
              onClick={()=> navigate(`/subscriptions/${subscription.id}`)}
            >
              <h3 className='subscription-title'>{subscription.title}</h3>
              <h4 className='subscription-price'>{subscription.price}/{subscription.frequency}
              </h4>
              {subscriptionImage && (
                <img
                  className='subscription-image'
                  src={subscriptionImage}
                  alt="Tea Image"
                />
              )}
            </div>
          )})}
        </div>
      </div>
    </main>
  )
};
export default Home;
