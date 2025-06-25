import { useEffect, useState } from 'react';
import '../styles/components/SearchBar.css';

export default function SearchBar({ onSearchChange }) {
    const defaultSearch = localStorage.getItem("searchTerm") || "";


  const [inputValue, setInputValue] = useState(defaultSearch);

  function handleChange(event) {
    setInputValue(event.target.value);
  }

  function clearInput() {
    setInputValue("");
    onSearchChange("");
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange(inputValue.trim());
    }, 500);
    return () => clearTimeout(timer);
  }, [inputValue, onSearchChange]);

   return (
    <div className="searchbar-container">
      <label htmlFor="search" className="searchbar-label">
        Search Recipes:
      </label>
      <div className="search-input-wrapper">
        <input
          id="search"
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="e.g., chicken, pasta..."
          className="searchbar-input"
        />
        {inputValue && (
          <button
            className="clear-button"
            onClick={clearInput}
            aria-label="Clear search input"
          >
            &#x2715;
          </button>
        )}
      </div>
    </div>
  );
}
