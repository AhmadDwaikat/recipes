export async function fetchMealById(mealId) {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
  );
  if (!response.ok) throw new Error("Failed to fetch meal by ID");
  const data = await response.json();
  return data.meals[0];
}
