import { useQuery } from "@tanstack/react-query";
import { fetchMealsByCategory } from "../api/fetchMealsByCategory";
import { fetchMealsByArea } from "../api/fetchMealsByArea";
import { Link } from "react-router-dom";
import "../styles/components/MealsByFilters.css";

export default function MealsByFilters({ selectedCategory, selectedArea }) {
  // Fetch meals by category
  const {
    data: categoryData,
    isLoading: categoryLoading,
    error: categoryError,
  } = useQuery({
    queryKey: ["mealsByCategory", selectedCategory],
    queryFn: () => fetchMealsByCategory(selectedCategory),
    enabled: !!selectedCategory,
  });

  // Fetch meals by area
  const {
    data: areaData,
    isLoading: areaLoading,
    error: areaError,
  } = useQuery({
    queryKey: ["mealsByArea", selectedArea],
    queryFn: () => fetchMealsByArea(selectedArea),
    enabled: !!selectedArea,
  });

  // Handle loading state (show if any loading)
  if (categoryLoading || areaLoading) return <p className="meals-loading">Loading meals...</p>;

  // Handle errors (show if any error)
  if (categoryError || areaError) return <p className="meals-error">Failed to load meals.</p>;

  // Decide which meals to display:
  // Priority: If both filters applied, show intersection if you want,
  // otherwise show categoryData if selected, else areaData
  // For simplicity, here I combine both arrays (without filtering duplicates)
  let meals = [];

if (selectedCategory && selectedArea) {
  const categoryMeals = categoryData?.meals || [];
  const areaMeals = areaData?.meals || [];

  // Keep only meals present in both category and area
  meals = categoryMeals.filter(catMeal =>
    areaMeals.some(areaMeal => areaMeal.idMeal === catMeal.idMeal)
  );
} else if (selectedCategory) {
    meals = categoryData?.meals || [];
  } else if (selectedArea) {
    meals = areaData?.meals || [];
  } else {
    return <p>Please select a category or an area to see meals.</p>;
  }

  if (meals.length === 0) return <p className="meals-empty">No meals found.</p>;

  return (
    <section className="meals-by-filters">
      <h2 className="meals-filter-title">
        {selectedCategory && selectedArea
          ? `Meals in ${selectedCategory} category and ${selectedArea} area`
          : selectedCategory
          ? `${selectedCategory} Meals`
          : `${selectedArea} Meals`}
      </h2>

      <div className="meals-grid">
        {meals.map((meal) => (
          <div className="meal-card" key={meal.idMeal}>
            <Link to={`/favorites/mealdetails/${meal.idMeal}`} className="meal-link">
              <img className="meal-img" src={meal.strMealThumb} alt={meal.strMeal} />
              <h3 className="meal-title">{meal.strMeal}</h3>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
