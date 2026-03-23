import { Link } from 'react-router-dom';
import './homePage.css';

export default function HomePage() {
  return (
    <div className="home-container">
      <nav className="navbar">
        <h2 className="logo">MyApp</h2>
        <ul className="nav-links">
          <li>Home</li>
          <li>Profile</li>
          <li>Logout</li>
        </ul>
      </nav>

      <div className="home-box">
        <h1>Welcome Back 👋</h1>
        <p>You have successfully logged in</p>
        <button>Explore</button>
        <Link to="/login" className="login-link">Go to Login Page</Link>
      </div>
    </div>
  );
}