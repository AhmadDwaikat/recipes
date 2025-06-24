import { useFavorites } from "../hooks/useFavorites";
import { Link } from "react-router-dom";
import "../styles/pages/Favorites.css";

export default function Favorites() {
  const { favorites, removeFromFavorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <section className="favorites-empty">
        <h2>No Favorites Yet</h2>
        <p>Start adding some meals to your favorites!</p>
      </section>
    );
  }

  return (
    <section className="favorites-list">
    
      <div className="favorites-title">
        <h2>Your Favorite Meals</h2>
      </div>

      <div className="favorites-grid">
        {[...favorites].reverse().map((meal) => (
          <div key={meal.idMeal} className="favorite-meal-wrapper">
            <button
              className="remove-favorite-btn"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                removeFromFavorites(meal.idMeal);
              }}
              title="Remove from favorites"
            >
              &times;
            </button>

            <div className="home-meal-card">
              <Link
                to={`/favorites/mealdetails/${meal.idMeal}`}
                className="home-link"
                state={{ from: "favorites" }}
              >
              <h3 className="home-card-title">{meal.strMeal}</h3>
              <div className="home-meal-meta">
                <p>
                  <strong>Category:</strong> {meal.strCategory}
                </p>
                <p>
                  <strong>Area:</strong> {meal.strArea}
                </p>
              </div>

              
                <img
                  className="home-card-img"
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
