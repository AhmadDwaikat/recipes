import { NavLink} from "react-router-dom";
import ThemeToggleButton from "./ThemeToggleButton";
import "../styles/components/Navbar.css";

export default function Navbar() {
  // const location = useLocation();

  // const isHomePage = location.pathname === "/home";
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="/home">🍳 Recipe Roulette+</a>
      </div>

      <ul className="navbar-links">
        <li>
          <NavLink
            to="/home"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            🏠 Home
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/favorites"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            ⭐ Favorites
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            ℹ️ About
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            📞 Contact
          </NavLink>
        </li>
        <li>
          <NavLink to="/home/randommeals" className="nav-anchor-link">
            🎲 Surprise Me
          </NavLink>
        </li>
        <li className="navbar-theme-toggle">
          <ThemeToggleButton />
        </li>
      </ul>
    </nav>
  );
}
