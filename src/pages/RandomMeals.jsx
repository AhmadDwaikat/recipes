import { useQuery } from "@tanstack/react-query";
import FeelingLucky from "../components/FeelingLucky";
import { fetchRandomRecipe } from "../api/randomRecipeApi";

export default function RandomMeals(){
const { data, refetch } = useQuery({
    queryKey: ["meals"],
    queryFn: fetchRandomRecipe,
  });
    return(<>
          <FeelingLucky data={data} refetch={refetch} />

    </>)
}