export async function searchMealByName(mealname) {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealname}`
  );
  if (!response.ok) throw new Error("Failed to fetch meal by name");
  const data = await response.json();
   return data.meals || []; 
}
