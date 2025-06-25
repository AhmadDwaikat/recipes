import { useEffect, useState } from "react";
import "../styles/components/Filters.css";

export default function Filters({
  category,
  area,
  ingredient,
  setCategory,
  setArea,
  setIngredient,
}) {
  const [categories, setCategories] = useState([]);
  const [areas, setAreas] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch(
          "https://www.themealdb.com/api/json/v1/1/list.php?c=list"
        );
        const data = await res.json();
        setCategories(data.meals || []);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    }
    async function fetchAreas() {
      try {
        const res = await fetch(
          "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
        );
        const data = await res.json();
        setAreas(data.meals || []);
      } catch (err) {
        console.error("Failed to fetch areas:", err);
      }
    }

    async function fetchIngredients() {
      try {
        const res = await fetch(
          "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
        );
        const data = await res.json();
        setIngredients(data.meals || []);
      } catch (err) {
        console.error("Failed to fetch ingredients:", err);
      }
    }

    fetchCategories();
    fetchAreas();
    fetchIngredients();
  }, []);

  return (
    <section className="home-filters">
      <h2>Filters</h2>

      <label htmlFor="meal-select">Category:</label>
      <select
        id="meal-select"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">All</option>
        {categories.map((cat) => (
          <option key={cat.strCategory} value={cat.strCategory}>
            {cat.strCategory}
          </option>
        ))}
      </select>

      <label htmlFor="area-select">Area:</label>
      <select
        id="area-select"
        value={area}
        onChange={(e) => setArea(e.target.value)}
      >
        <option value="">All</option>
        {areas.map((area) => (
          <option key={area.strArea} value={area.strArea}>
            {area.strArea}
          </option>
        ))}
      </select>

      <label htmlFor="ingredient-select">Ingredient:</label>
      <select
        id="ingredient-select"
        value={ingredient}
        onChange={(e) => setIngredient(e.target.value)}
      >
        <option value="">All</option>
        {ingredients.map((ing) => (
          <option key={ing.strIngredient} value={ing.strIngredient}>
            {ing.strIngredient}
          </option>
        ))}
      </select>
    </section>
  );
}
