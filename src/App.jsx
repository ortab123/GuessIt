// import TestSupabase from "./components/TestSupabase";
import { useState } from "react";
import { useAuth } from "./context/AuthContext";
import SignupForm from "./components/SignUpForm";
import LoginForm from "./components/LoginForm";
import "./App.css";

function App() {
  const { state, handleLogout } = useAuth();
  const [screen, setScreen] = useState("home");

  if (!state.session) {
    if (screen === "signup")
      return <SignupForm goBack={() => setScreen("home")} />;
    if (screen === "login")
      return <LoginForm goBack={() => setScreen("home")} />;
    return (
      <div>
        <h1>GuessIt</h1>
        <p>Learn about dog breeds while playing a fun guessing game!</p>
        <p>Let's start! First you need to sign up.</p>
        <button onClick={() => setScreen("signup")}>Sign Up</button>
        <p>If you already have a user, then login and let's play!</p>
        <button onClick={() => setScreen("login")}>Login</button>
      </div>
    );
  }

  return (
    <div>
      <h1>GuessIt</h1>
      <p>Welcome! You are logged in as {state.session.user.email}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default App;
