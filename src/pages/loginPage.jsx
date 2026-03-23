import { Link } from "react-router-dom";
import "./loginPage.css";

export default function LoginPage() {
  return (
    <div className="container">
      <div className="login-box">
        <h1>Login</h1>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button>Login</button>
        <Link to="/" className="home-link">Go to Home Page</Link>
      </div>
    </div>
  );
}