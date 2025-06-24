// components/FeelingLucky.js
import { Link } from "react-router-dom";
import "../styles/components/SurpriseRecipe.css"
export default function FeelingLucky({ data, refetch }) {
  return (
    <div className="ppp" id="feeling-lucky">
      <section className="home-section">
        <h2 className="home-section-title">Feeling Lucky?</h2>
        <button className="home-btn-surprise" onClick={refetch}>
          🎲 Surprise Me!
        </button>
        {data && (
          <Link
            to={`/home/mealdetails/${data.idMeal}`}
            className="home-link"
            state={{ from: "home" }}
          >
            <div className="random-meal">
              <div className="home-meal-card">
                <h3 className="home-card-title">{data.strMeal}</h3>
                <div className="home-meal-meta">
                  <p><strong>Category:</strong> {data.strCategory}</p>
                  <p><strong>Area:</strong> {data.strArea}</p>
                </div>
                <img
                  className="home-card-img"
                  src={data.strMealThumb}
                  alt={data.strMeal}
                  width={300}
                />
              </div>
            </div>
          </Link>
        )}
      </section>
    </div>
  );
}
