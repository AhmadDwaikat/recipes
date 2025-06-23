import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import "./styles/themes.css";
import MealCard from "./components/MealCard";
import MealDetails from "./pages/MealDetails";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/home/:mealId" element={<MealDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
