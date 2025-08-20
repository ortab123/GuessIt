import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home">
      <h1>GuessIt</h1>
      <p>Learn about dog breeds while playing a fun guessing game!</p>
      <p>Let's start! First you need to sign up.</p>
      <Link to="/signup">
        <button>Sign Up</button>
      </Link>

      <p>If you already have a user, then login and let's play!</p>
      <Link to="/login">
        <button>Login</button>
      </Link>
    </div>
  );
}
