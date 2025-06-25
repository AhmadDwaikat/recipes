export async function fetchMealsByCategory(category) {
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
  if (!res.ok) throw new Error("Failed to fetch meals by category");
  const data = await res.json();
  return data;
}
