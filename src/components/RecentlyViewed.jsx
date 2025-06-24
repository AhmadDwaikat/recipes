// components/RecentlyViewed.jsx
import { Link } from "react-router-dom";
import "../styles/components/RecentlyViewed.css"

export default function RecentlyViewed({ lastViewed, removeMeal }) {
  return (
    <section className="rv-section">
      <h2 className="rv-title">Recently Viewed Recipes</h2>
      {lastViewed?.length === 0 && (
        <p className="rv-empty">No recently viewed meals.</p>
      )}
      <div className="rv-grid">
        {[...lastViewed].reverse().map((last) => (
          <div className="rv-item" key={last.idMeal}>
            <Link
              to={`/home/mealdetails/${last.idMeal}`}
              className="rv-link"
              state={{ from: "home" }}
            >
              <div className="rv-meal-card-wrapper">
                <div className="rv-meal-card">
                  <h3 className="rv-meal-title">{last.strMeal}</h3>
                  <div className="rv-meal-meta">
                    <p><strong>Category:</strong> {last.strCategory}</p>
                    <p><strong>Area:</strong> {last.strArea}</p>
                  </div>
                  <img
                    className="rv-meal-img"
                    src={last.strMealThumb}
                    alt={last.strMeal}
                    width={300}
                  />
                </div>
              </div>
            </Link>
            <button
              className="rv-remove-button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                removeMeal(last.idMeal);
              }}
            >
              ❌ Remove
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
