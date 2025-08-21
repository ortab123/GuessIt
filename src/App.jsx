import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom"
import { useAuth } from "./context/AuthContext"
import SignupForm from "./pages/SignUpForm"
import LoginForm from "./pages/LoginForm"
import WhoIsPlaying from "./pages/WhoIsPlaying"
import AddChild from "./pages/AddChild"
import ChildScreen from "./pages/ChildScreen"
import ParentDashboard from "./pages/ParentDashboard"
import Header from "./components/Header"
import "./App.css"

function App() {
  const { state, handleLogout } = useAuth()
  const isAuthed = !!state.session
  const navigate = useNavigate()

  const handleBack = () => {
    navigate("/who")
  }

  return (
    <>
      <Header onLogout={handleLogout} onBack={handleBack} />
      <Routes>
        <Route path="/" element={<Navigate to="/who" replace />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/who" element={<WhoIsPlaying />} />
        <Route path="/parent" element={isAuthed ? <ParentDashboard /> : <Navigate to="/login" replace />} />
        <Route path="/add" element={isAuthed ? <AddChild /> : <Navigate to="/login" replace />} />
        <Route path="/child/:id" element={isAuthed ? <ChildScreen /> : <Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/who" replace />} />
      </Routes>
    </>
  )
}

export default function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
}
