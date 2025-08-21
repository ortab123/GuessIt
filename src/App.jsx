import { useState } from "react";
import { useAuth } from "./context/AuthContext";
import SignupForm from "./components/SignUpForm";
import LoginForm from "./components/LoginForm";
import ParentDashboard from "./components/ParentDashboard/ParentDashboard";
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">GuessIt</h1>
          <p className="text-gray-600 mb-4">
            Learn about dog breeds while playing a fun guessing game!
          </p>
          <p className="text-gray-600 mb-6">
            Let's start! First you need to sign up.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => setScreen("signup")}
              className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Sign Up
            </button>
            <p className="text-gray-600 text-sm">
              If you already have a user, then login and let's play!
            </p>
            <button
              onClick={() => setScreen("login")}
              className="w-full px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all duration-200"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (screen === "parent-dashboard") {
    return <ParentDashboard onBack={() => setScreen("home")} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">GuessIt</h1>
        <p className="text-gray-600 mb-6">
          Welcome! You are logged in as {state.session.user.email}
        </p>

        <div className="space-y-4">
          <button
            onClick={() => setScreen("parent-dashboard")}
            className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center space-x-2"
          >
            <span>👨‍👩‍👧‍👦</span>
            <span>Parent Dashboard</span>
          </button>

          <button
            onClick={handleLogout}
            className="w-full px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
