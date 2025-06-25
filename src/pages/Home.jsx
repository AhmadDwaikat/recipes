import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import RecentlyViewed from "../components/RecentlyViewed";
import useLastViewed from "../hooks/useLastViewed";
import SearchByName from "../components/SearchByName";
import MealsByFilters from "../components/MealsByFilters";
import "../styles/pages/Home.css";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState(
    localStorage.getItem("category") || ""
  );
  const [area, setArea] = useState(localStorage.getItem("area") || "");
  const [ingredient, setIngredient] = useState(
    localStorage.getItem("ingredient") || ""
  );

  const { lastViewed, removeMeal } = useLastViewed();

  useEffect(() => {
    localStorage.setItem("searchTerm", searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    localStorage.setItem("category", category);
  }, [category]);

  useEffect(() => {
    localStorage.setItem("area", area);
  }, [area]);

  useEffect(() => {
    localStorage.setItem("ingredient", ingredient);
  }, [ingredient]);

  return (
    <>
      <header className="home-header">
        <h1>🍽️ Recipe Explorer</h1>
      </header>

      <section className="home-section">
        <SearchBar onSearchChange={setSearchTerm} />

        <Filters
          category={category}
          area={area}
          ingredient={ingredient}
          setCategory={setCategory}
          setArea={setArea}
          setIngredient={setIngredient}
        />
      </section>
      
      {(category || area || ingredient || searchTerm) && (
        <section className="home-results">
          <MealsByFilters
            selectedCategory={category}
            selectedArea={area}
            selectedIngredient={ingredient}
          />
          <SearchByName mealName={searchTerm} />
        </section>
      )}

      <RecentlyViewed lastViewed={lastViewed} removeMeal={removeMeal} />

      <footer className="home-footer">
        <div>📞 About, Contact, or Copyright</div>
        <div>🌐 Follow us on GitHub or Social Media</div>
      </footer>
    </>
  );
}
