// searchMealByNameApi.js

export async function searchMealByName(mealname) {
  if (!mealname || !mealname.trim()) return [];

  mealname = mealname.trim().toLowerCase().replace(/\s+/g, " ");

  try {
    // 1. Try exact search with original input
    let results = await fetchMeal(mealname);
    if (results.length) return results;

    // 2. Partial search by reducing the search term word by word
    const words = mealname.split(" ");
    for (let i = words.length - 1; i > 0; i--) {
      const partialTerm = words.slice(0, i).join(" ");
      results = await fetchMeal(partialTerm);
      if (results.length) return results;
    }

    // 3. Fallback: search by first letter if it's English letter
    const firstLetter = mealname[0];
    if (/^[a-z]$/.test(firstLetter)) {
      results = await fetchMealsByFirstLetter(firstLetter);
      if (results.length) return results;
    }

    return [];
  } catch (error) {
    console.error("Error in searchMealByName:", error);
    return [];
  }
}

async function fetchMeal(name) {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(name)}`;
  const res = await fetch(url);
  if (!res.ok) return [];
  const data = await res.json();
  return data.meals || [];
}

async function fetchMealsByFirstLetter(letter) {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`;
  const res = await fetch(url);
  if (!res.ok) return [];
  const data = await res.json();
  return data.meals || [];
}
