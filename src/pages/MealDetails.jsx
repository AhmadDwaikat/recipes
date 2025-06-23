import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchMealById } from '../api/mealApi';
import MealCard from '../components/MealCard';
import '../styles/pages/MealDetails.css';

export default function MealDetails() {
  const { mealId } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ['meal', mealId],
    queryFn: () => fetchMealById(mealId),
    enabled: !!mealId,
  });

  if (isLoading) return <p className="meal-details-loading">Loading...</p>;
  if (error) return <p className="meal-details-error">Error loading meal.</p>;

  return (
    <div className="meal-details-container">
      <Link to="/home" className="meal-details-back-link">← Back to Home</Link>
      <MealCard data={data} />
    </div>
  );
}
