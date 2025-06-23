import '../styles/components/MealCard.css';

export default function MealCard({ data }) {
  if (!data) return null;

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = data[`strIngredient${i}`];
    const measure = data[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push(`${measure} ${ingredient}`.trim());
    }
  }

  return (
    <article className="mealcard-card">
      <h3 className="mealcard-title">{data.strMeal}</h3>
      <img
        className="mealcard-img"
        src={data.strMealThumb}
        alt={data.strMeal}
        width={300}
      />
      <p className="mealcard-text">
        <strong>Category:</strong> {data.strCategory}
      </p>
      <p className="mealcard-text">
        <strong>Area:</strong> {data.strArea}
      </p>

      <h4 className="mealcard-section-title">Ingredients:</h4>
      <ul className="mealcard-ingredients-list">
        {ingredients.map((item, idx) => (
          <li key={idx} className="mealcard-ingredients-item">
            {item}
          </li>
        ))}
      </ul>

      <h4 className="mealcard-section-title">Instructions:</h4>
      <p className="mealcard-text mealcard-text-instructions">{data.strInstructions}</p>

      {data.strYoutube && (
        <p>
          <a
            href={data.strYoutube}
            className="mealcard-link"
            target="_blank"
            rel="noreferrer"
          >
            🎥 Watch on YouTube
          </a>
        </p>
      )}

      {data.strSource && (
        <p>
          <a
            href={data.strSource}
            className="mealcard-link"
            target="_blank"
            rel="noreferrer"
          >
            🔗 Source
          </a>
        </p>
      )}
    </article>
  );
}
