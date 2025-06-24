// components/Filters.jsx
import "../styles/components/Filters.css"

export default function Filters({ mealType, diet, setMealType, setDiet }) {
  return (
    <section className="home-filters">
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
  );
}
