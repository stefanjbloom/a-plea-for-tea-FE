import './Home.css'
import teapotIcon from '../../data/icons/teapot.png'
import SearchBar from '../SearchBar/SearchBar'
import { useNavigate } from 'react-router-dom'

const Home = ({ subscriptions }) => {

  const navigate = useNavigate();
  console.log("Subscriptions array:", subscriptions);
  return(
    <main className='home-main'>
      <SearchBar/>
      <div className='home-div'>
        <h2 className='home-header'>A Plea for Tea Subscription Service</h2>
          <img className='tea-icon' alt='Teapot Icon' src={teapotIcon}></img>
        <div className='subscription-list'>
          {subscriptions.map((subscription, index) => (
            <div 
              className='subscription-index'
              key={index}
              onClick={()=> navigate(`/subscriptions/${subscription.id}`)}
            >
              <h3 className='subscription-title'>{subscription.title}</h3>
              <h4 className='subscription-price'>{subscription.price}/{subscription.frequency}</h4>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
};
export default Home;
