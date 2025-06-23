import { Link } from 'react-router-dom';
import '../styles/pages/Landing.css';
import ThemeToggleButton from '../components/ThemeToggleButton';

export default function Landing() {
  return (
    <main className="landing-main">
  <ThemeToggleButton />

  <section className="landing-hero">
    <h1>Recipe Roulette+</h1>
    <p className="landing-tagline">
      Discover. Create. Eat. Your culinary adventure starts here.
    </p>
    <Link to="/home" className="landing-cta-btn">
      Start Exploring
    </Link>
  </section>

  <section className="landing-features">
    <h2>Features</h2>
    <ul className="landing-features-list">
      <li>🎯 <strong>Search by Ingredients:</strong> Find recipes using what you have.</li>
      <li>🍽️ <strong>Filter by Meal Type & Diet:</strong> Breakfast, dinner, vegan, gluten-free, and more.</li>
      <li>✍️ <strong>Create & Save Recipes:</strong> Add your own favorites.</li>
      <li>🎲 <strong>Surprise Me:</strong> Get random recipe ideas.</li>
      <li>⭐ <strong>Favorites & Reviews:</strong> Keep and share your top picks.</li>
    </ul>
  </section>

  <section className="landing-about">
    <h2>About Recipe Roulette+</h2>
    <p>
      A fun and easy way to discover and create recipes tailored to your tastes.
      Whether you’re new or experienced, find inspiration and share your culinary creations.
    </p>
  </section>

  <footer className="landing-footer">
    <p>© 2025 Recipe Roulette+ • Built with ❤️ using React</p>
  </footer>
</main>
  );
}
