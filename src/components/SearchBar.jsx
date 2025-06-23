import { useEffect, useState } from 'react';
import '../styles/components/SearchBar.css';

export default function SearchBar({ onSearchChange }) {
  const [inputValue, setInputValue] = useState('');

  function handleChange(event) {
    setInputValue(event.target.value);
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
      <input
        id="search"
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="e.g., chicken, pasta..."
        className="searchbar-input"
      />
    </div>
  );
}
