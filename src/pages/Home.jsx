import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchRandomRecipe } from "../api/randomRecipeApi";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import RecentlyViewed from "../components/RecentlyViewed";
import FeelingLucky from "../components/FeelingLucky";
import useLastViewed from "../hooks/useLastViewed";
import "../styles/pages/Home.css";
import SearchByName from "../components/SearchByName";
import MealsByFilters from "../components/MealsByFilters";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
 const [category, setCategory] = useState(localStorage.getItem("category") || "");
const [area, setArea] = useState(localStorage.getItem("area") || "");


  const { lastViewed, removeMeal } = useLastViewed();

  const { data, refetch } = useQuery({
    queryKey: ["meals"],
    queryFn: fetchRandomRecipe,
  });

  useEffect(() => {
    localStorage.setItem("searchTerm", searchTerm);
  }, [searchTerm]);

  useEffect(() => {
  localStorage.setItem("category", category);
}, [category]);

useEffect(() => {
  localStorage.setItem("area", area);
}, [area]);

  return (
    <>
      <header className="home-header">
        <h1>🍽️ Recipe Explorer</h1>
      </header>

      <section className="home-section">
        <SearchBar onSearchChange={setSearchTerm} />
        <p className="home-filters-info">
          <strong>Current Search:</strong> {searchTerm || "None"}
        </p>
      </section>

      <Filters
        category={category}
        area={area}
        setCategory={setCategory}
        setArea={setArea}
      />

      <p className="home-filters-info">
        <strong>Meal Type:</strong> {category || "Any"} | <strong>Area:</strong>{" "}
        {area || "Any"}
      </p>

      <section className="home-results">
        <h2>Results</h2>
        <MealsByFilters selectedCategory={category} selectedArea={area} />
        <SearchByName mealName={searchTerm} />
      </section>

      <RecentlyViewed lastViewed={lastViewed} removeMeal={removeMeal} />
      <FeelingLucky data={data} refetch={refetch} />

      <footer className="home-footer">
        <div>📞 About, Contact, or Copyright</div>
        <div>🌐 Follow us on GitHub or Social Media</div>
      </footer>
    </>
  );
}
