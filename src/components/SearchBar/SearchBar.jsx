import './SearchBar.css'
import { useState } from 'react';

const SearchBar = ({ subscriptions, setSubscriptions }) => {
  const [searchInput, setSearchInput] = useState("");

  const handleSearchInput = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchInput(query);

    setSubscriptions(prevSubscriptions => {
      return prevSubscriptions.filter(subscription =>
        subscription.title.toLowerCase().includes(query)
      );
    });
  };
  return (
    <div className='search-bar'>
      <input
        className='search-input'
        type='text'
        placeholder='Search a Subscription by Title'
        value={searchInput}
        onChange={handleSearchInput}
      />
    </div>
  )
};
export default SearchBar;