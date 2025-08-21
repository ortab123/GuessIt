import { useAuth } from "../context/AuthContext"
import { useNavigate, Link } from "react-router-dom"
import { useState } from "react"

export default function LoginForm({ goBack }) {
  const { handleLogin } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await handleLogin(email, password)
    if (res?.error) {
      setMessage(res.error)
    } else {
      setMessage("")
      navigate("/who")
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-md max-w-md mx-auto mt-10"
    >
      <h2 className="text-xl font-bold mb-2 text-center">Parent Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 rounded"
      />
      <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        Login
      </button>
      <Link to="/signup" className="text-blue-600 underline text-sm text-center">
        Don't have an account? Sign up
      </Link>
      {goBack && (
        <button type="button" onClick={goBack} className="text-gray-600 underline text-sm">
          Back
        </button>
      )}
      {message && <p className="text-red-500 text-center">{message}</p>}
    </form>
  )
}
