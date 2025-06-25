export async function fetchMealsByIngredient(ingredient) {
  // Correct endpoint to fetch meals filtered by area
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  if (!res.ok) throw new Error("Failed to fetch meals by ingredient");
  const data = await res.json();
  return data; 
}
