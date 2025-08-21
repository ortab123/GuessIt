import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from "./context/AuthContext"
import SignupForm from "./pages/SignUpForm"
import LoginForm from "./pages/LoginForm"
import WhoIsPlaying from "./pages/WhoIsPlaying"
import Home from "./pages/Home"

import "./App.css"
import ParentDashboard from "./components/ParentDashboard/ParentDashboard.jsx"

function App() {
  const { state, handleLogout } = useAuth()

  if (screen === "parent-dashboard") {
    return <ParentDashboard onBack={() => setScreen("home")} />
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/who" element={<WhoIsPlaying />} />
        <Route path="/parent" element={<ParentDashboard />} />
        {/* <Route path="/child" element={<ChildDashboard />} /> */}
        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
