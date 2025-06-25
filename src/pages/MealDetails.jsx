import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchMealById } from "../api/mealApi";
import MealCard from "../components/MealCard";
import "../styles/pages/MealDetails.css";
import useLastViewed from "../hooks/useLastViewed";
import { useEffect } from "react";
export default function MealDetails() {
  const { mealId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["meal", mealId],
    queryFn: () => fetchMealById(mealId),
    enabled: !!mealId,
  });
  
  const { addMeal } = useLastViewed();
  useEffect(() => {
    if (data) {
      addMeal(data);
    }
  }, [data, addMeal]);



  const from = location.state?.from || "home";

  const handleBack = () => {
    if (from === "favorites") {
      navigate("/favorites");
    } else if (from === "home") {
      navigate("/home");
    } else {
      navigate(-1);
    }
  };

  if (isLoading) return <p className="meal-details-loading">Loading...</p>;

  if (error)
    return (
      <div className="meal-details-error">
        <p>Error loading meal. Please try again.</p>
        <button onClick={() => refetch()} aria-label="Retry loading meal">
          Retry
        </button>
      </div>
    );

  if (!data) return <p className="meal-details-error">Meal data not found.</p>;

  return (
    <div className="meal-details-container">
      <button
        type="button"
        className="meal-details-back-link"
        onClick={handleBack}
        aria-label={`Go back to ${from}`}
      >
        {from === "favorites" ? "← Back to Favorites" : "← Back to Home"}
      </button>

      <MealCard data={data} />
    </div>
  );
}
