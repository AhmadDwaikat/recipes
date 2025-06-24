import { useEffect, useState } from "react";

const STORAGE_KEY = "lastViewed";
const MAX_HISTORY = 6;

export default function useLastViewed() {
  const [lastViewed, setLastViewed] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  // Sync to localStorage whenever updated
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lastViewed));
  }, [lastViewed]);

  const addMeal = (meal) => {
    if (!meal?.idMeal) return;

    setLastViewed((prev) => {
      const exists = prev.find((m) => m.idMeal === meal.idMeal);
      if (exists) return prev;

      const updated = [...prev, meal];
      return updated.slice(-MAX_HISTORY); // keep last 6
    });
  };

  const removeMeal = (idMeal) => {
    setLastViewed((prev) => prev.filter((meal) => meal.idMeal !== idMeal));
  };

  const isViewed = (idMeal) => {
    return lastViewed.some((meal) => meal.idMeal === idMeal);
  };

  return {
    lastViewed,
    addMeal,
    removeMeal,
    isViewed,
  };
}
