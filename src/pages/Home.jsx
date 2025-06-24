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

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [mealType, setMealType] = useState("");
  const [diet, setDiet] = useState("");

  const { lastViewed, removeMeal } = useLastViewed();

  const { data, refetch } = useQuery({
    queryKey: ["meals"],
    queryFn: fetchRandomRecipe,
  });
useEffect(() => {
  localStorage.setItem('searchTerm', searchTerm);
}, [searchTerm]);

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
        mealType={mealType}
        diet={diet}
        setMealType={setMealType}
        setDiet={setDiet}
      />

      <p className="home-filters-info">
        <strong>Meal Type:</strong> {mealType || "Any"} | <strong>Diet:</strong>{" "}
        {diet || "Any"}
      </p>

      <section className="home-results">
        <h2>Results</h2>
        <SearchByName mealName={searchTerm}/>
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
