export async function fetchMealsByArea(area) {
  // Correct endpoint to fetch meals filtered by area
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
  if (!res.ok) throw new Error("Failed to fetch meals by area");
  const data = await res.json();
  return data; 
}
