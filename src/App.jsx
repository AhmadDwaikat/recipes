import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import MealDetails from "./pages/MealDetails";
import Navbar from "./components/Navbar";
import Favorites from "./pages/Favorites";
import "./styles/themes.css";
import "./App.css";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/home/mealdetails/:mealId" element={<MealDetails />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route
            path="/favorites/mealdetails/:mealId"
            element={<MealDetails />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
