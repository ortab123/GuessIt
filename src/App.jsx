import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import SignupForm from "./pages/SignUpForm";
import LoginForm from "./pages/LoginForm";
import WhoIsPlaying from "./pages/WhoIsPlaying";
import Home from "./pages/Home"; 
import AddChild from "./pages/AddChild";  
import "./App.css";

function App() {
  const { state, handleLogout } = useAuth();
   const isAuthed = !!state.session;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/who" element={<WhoIsPlaying />} />
        <Route
          path="/add"
          element={isAuthed ? <AddChild /> : <Navigate to="/" replace />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
