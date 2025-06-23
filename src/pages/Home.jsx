import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

import { fetchRandomRecipe } from '../api/randomRecipeApi';
import ThemeToggleButton from '../components/ThemeToggleButton';
import SearchBar from '../components/SearchBar';
import '../styles/pages/Home.css';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [mealType, setMealType] = useState('');
  const [diet, setDiet] = useState('');

  const { data, refetch } = useQuery({
    queryKey: ['meals'],
    queryFn: fetchRandomRecipe,
  });

  return (
    <>
      <ThemeToggleButton />

      <header className="header">
        <h1>Recipe Explorer</h1>
      </header>

      {/* Search Section */}
      <section className="section">
        <SearchBar onSearchChange={setSearchTerm} />
        <p className="filters-info">
          <strong>Current Search:</strong> {searchTerm || 'None'}
        </p>
      </section>

      {/* Filters */}
      <section className="filters">
        <h2>Filters</h2>

        <label htmlFor="meal-select">Meal Type:</label>
        <select
          id="meal-select"
          value={mealType}
          onChange={(e) => setMealType(e.target.value)}
        >
          <option value="">All</option>
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
          <option value="snack">Snack</option>
        </select>

        <label htmlFor="diet-select">Diet:</label>
        <select
          id="diet-select"
          value={diet}
          onChange={(e) => setDiet(e.target.value)}
        >
          <option value="">All</option>
          <option value="vegan">Vegan</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="gluten-free">Gluten-Free</option>
        </select>
      </section>

      <p className="filters-info">
        <strong>Meal Type:</strong> {mealType || 'Any'} | <strong>Diet:</strong>{' '}
        {diet || 'Any'}
      </p>

      {/* Placeholder for results */}
      <section className="results">
        <h2>Results</h2>
        <p>Recipe list coming soon...</p>
      </section>

      {/* Feeling Lucky Section */}
      <section className="section">
        <h2>Feeling Lucky?</h2>
        <button className="btn-surprise" onClick={refetch}>
          🎲 Surprise Me!
        </button>

        {data && (
          <Link to={`/home/${data.idMeal}`}>
            <h3 className="card-title">{data.strMeal}</h3>
            <img
              className="card-img"
              src={data.strMealThumb}
              alt={data.strMeal}
              width={300}
            />
            <p className="text">
              <strong>Category:</strong> {data.strCategory}
            </p>
          </Link>
        )}
      </section>

      <footer className="footer">
        <div>📞 About, contact, or copyright</div>
        <div>🌐 Social or GitHub link</div>
      </footer>
    </>
  );
}
