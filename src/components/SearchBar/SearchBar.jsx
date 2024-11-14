import "./SearchBar.css";
import { useState } from "react";

const SearchBar = ({ setSubscriptions, allSubscriptions }) => {
  const [searchInput, setSearchInput] = useState("");

  const handleSearchInput = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchInput(query);

    if (query === "") {
      setSubscriptions(allSubscriptions);
    } else {
      const filterSubscriptions = allSubscriptions.filter((subscription) =>
        subscription.title.toLowerCase().includes(query)
      );
      setSubscriptions(filterSubscriptions);
    }
  };

  return (
    <div className="search-bar">
      <input
        className="search-input"
        type="text"
        placeholder="Search a Subscription by Title"
        value={searchInput}
        onChange={handleSearchInput}
      />
    </div>
  );
};
export default SearchBar;
