import { searchMealByName } from "../api/searchMealByNameApi";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import "../styles/components/SearchByName.css";

export default function SearchByName({ mealName }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["meals", mealName],
    queryFn: () => searchMealByName(mealName),
    enabled: !!mealName,
  });

  if (isLoading) return <p>Loading meals...</p>;
  if (error) return <p>Error fetching meals.</p>;
  if (!data || data.length === 0) return <p>No meals found.</p>;

  return (
    <section className="search-results">
      <div className="search-results-title">
        <h2>Search Results</h2>
      </div>

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
    </section>
  );
}
