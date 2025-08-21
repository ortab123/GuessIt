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

function ProtectedRoute({ children }) {
  const { session, loading } = useAuth()
  if (loading)
    return <div className="flex justify-center items-center h-screen text-xl">Loading...</div>
  if (!session) return <Navigate to="/login" replace />
  return children
}

function App() {
  const { session, handleLogout } = useAuth()
  const isAuthed = !!session
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
        <Route
          path="/who"
          element={
            <ProtectedRoute>
              <WhoIsPlaying />
            </ProtectedRoute>
          }
        />
        <Route
          path="/parent"
          element={
            <ProtectedRoute>
              <ParentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add"
          element={
            <ProtectedRoute>
              <AddChild />
            </ProtectedRoute>
          }
        />
        <Route
          path="/child/:id"
          element={
            <ProtectedRoute>
              <ChildScreen />
            </ProtectedRoute>
          }
        />
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
