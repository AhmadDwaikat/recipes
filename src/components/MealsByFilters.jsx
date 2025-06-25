import { useQuery } from "@tanstack/react-query";
import { fetchMealsByCategory } from "../api/fetchMealsByCategoryApi";
import { fetchMealsByArea } from "../api/fetchMealsByAreaApi";
import { fetchMealsByIngredient } from "../api/fetchMealsByIngredientApi";
import { Link } from "react-router-dom";
import "../styles/components/MealsByFilters.css";

export default function MealsByFilters({ selectedCategory, selectedArea, selectedIngredient }) {
  const {
    data: categoryData,
    isLoading: categoryLoading,
    error: categoryError,
  } = useQuery({
    queryKey: ["mealsByCategory", selectedCategory],
    queryFn: () => fetchMealsByCategory(selectedCategory),
    enabled: !!selectedCategory,
  });

  const {
    data: areaData,
    isLoading: areaLoading,
    error: areaError,
  } = useQuery({
    queryKey: ["mealsByArea", selectedArea],
    queryFn: () => fetchMealsByArea(selectedArea),
    enabled: !!selectedArea,
  });

  const {
    data: ingredientData,
    isLoading: ingredientLoading,
    error: ingredientError,
  } = useQuery({
    queryKey: ["mealsByIngredient", selectedIngredient],
    queryFn: () => fetchMealsByIngredient(selectedIngredient),
    enabled: !!selectedIngredient,
  });

  if (categoryLoading || areaLoading || ingredientLoading)
    return <p className="meals-loading">Loading meals...</p>;

  if (categoryError || areaError || ingredientError)
    return <p className="meals-error">Failed to load meals.</p>;

  const categoryMeals = categoryData?.meals || [];
  const areaMeals = areaData?.meals || [];
  const ingredientMeals = ingredientData?.meals || [];

  let meals = [];

  if (selectedCategory && selectedArea && selectedIngredient) {
    meals = categoryMeals.filter(
      (meal) =>
        areaMeals.some((a) => a.idMeal === meal.idMeal) &&
        ingredientMeals.some((i) => i.idMeal === meal.idMeal)
    );

    if (meals.length === 0) {
      meals = categoryMeals.filter((meal) =>
        areaMeals.some((a) => a.idMeal === meal.idMeal)
      );
    }

    if (meals.length === 0) {
      meals = categoryMeals.filter((meal) =>
        ingredientMeals.some((i) => i.idMeal === meal.idMeal)
      );
    }

    if (meals.length === 0) {
      meals = areaMeals.filter((meal) =>
        ingredientMeals.some((i) => i.idMeal === meal.idMeal)
      );
    }
  }

  else if (selectedCategory && selectedArea) {
    meals = categoryMeals.filter((meal) =>
      areaMeals.some((a) => a.idMeal === meal.idMeal)
    );
  } else if (selectedCategory && selectedIngredient) {
    meals = categoryMeals.filter((meal) =>
      ingredientMeals.some((i) => i.idMeal === meal.idMeal)
    );
  } else if (selectedArea && selectedIngredient) {
    meals = areaMeals.filter((meal) =>
      ingredientMeals.some((i) => i.idMeal === meal.idMeal)
    );
  }

  else if (selectedCategory) {
    meals = categoryMeals;
  } else if (selectedArea) {
    meals = areaMeals;
  } else if (selectedIngredient) {
    meals = ingredientMeals;
  } else {
  return null;
  }

  if (meals.length === 0) {
  if (selectedCategory || selectedArea || selectedIngredient) {
    return (
      <p className="meals-empty">
        No meals found
        {selectedCategory && ` in category "${selectedCategory}"`}
        {selectedArea && ` from area "${selectedArea}"`}
        {selectedIngredient && ` with ingredient "${selectedIngredient}"`}
        . Try different filters.
      </p>
    );
  } else {
    return null; // No filters applied, show nothing
  }
}


  return (
    <section className="meals-by-filters">
      <h2 className="meals-filter-title">
        Meals{" "}
        {selectedCategory && `in ${selectedCategory} category `}
        {selectedArea && `from ${selectedArea} area `}
        {selectedIngredient && `with ${selectedIngredient} `}
      </h2>

      <div className="meals-grid">
        {meals.map((meal) => (
          <div className="meal-card" key={meal.idMeal}>
            <Link
              to={`/favorites/mealdetails/${meal.idMeal}`}
              className="meal-link"
            >
              <img
                className="meal-img"
                src={meal.strMealThumb}
                alt={meal.strMeal}
              />
              <h3 className="meal-title">{meal.strMeal}</h3>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
