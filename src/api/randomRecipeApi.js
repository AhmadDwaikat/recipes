export async function fetchRandomRecipe() {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/random.php`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  console.log(data.meals[0]);
  return data.meals[0]; // Returns the random recipe
}
