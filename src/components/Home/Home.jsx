import './Home.css'
import SearchBar from '../SearchBar/SearchBar'
import { useNavigate } from 'react-router-dom'

const Home = ({ subscriptions }) => {

  const navigate = useNavigate();

  return(
    <main className='home-main'>
      <SearchBar/>
      <div className='home-div'>
        <h2 className='home-header'>A Plea for Tea Subscription Service</h2>
        <div className='subscription-list'>
          {subscriptions.map((subscription, index) => (
            <div 
              className='subscription-index'
              key={index}
              onClick={()=> navigate(`/subscriptions/${subscription.id}`)}
            >
              <h3 className='subscription-info'>{subscription.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
};
export default Home;
