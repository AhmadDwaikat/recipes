import { searchMealByName } from "../api/searchMealByNameApi";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import "../styles/components/SearchByName.css";

export default function SearchByName({ mealName }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["meals", mealName],
    queryFn: () => searchMealByName(mealName),
    enabled: !!mealName?.trim(),
  });

  // Only render content if user typed something
  const hasSearched = mealName.trim() !== "";

  return (
    <section className="search-results">
      {hasSearched && (
        <>
          <div className="search-results-title">
            <h2>Search Results</h2>
          </div>

          {isLoading && <p className="search-status">Loading meals...</p>}
          {error && <p className="search-status">Error fetching meals.</p>}
          {!isLoading && !error && (!data || data.length === 0) && (
            <p className="search-status">No meals found.</p>
          )}

          {!isLoading && !error && data && data.length > 0 && (
            <div className="search-results-grid">
              {data.map((meal) => (
                <div className="search-meal-wrapper" key={meal.idMeal}>
                  <div className="search-meal-card">
                    <Link
                      to={`/favorites/mealdetails/${meal.idMeal}`}
                      className="search-meal-link"
                    >
                      <h3 className="search-meal-title">{meal.strMeal}</h3>
                      <div className="search-meal-meta">
                        <p>
                          <strong>Category:</strong> {meal.strCategory}
                        </p>
                        <p>
                          <strong>Area:</strong> {meal.strArea}
                        </p>
                      </div>
                      <img
                        className="search-meal-img"
                        src={meal.strMealThumb}
                        alt={meal.strMeal}
                      />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}
