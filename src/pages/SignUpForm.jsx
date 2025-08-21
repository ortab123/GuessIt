import { useAuth } from "../context/AuthContext"
import { useNavigate, Link } from "react-router-dom"
import { useState } from "react"

export default function SignupForm({ goBack }) {
  const { handleSignup } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await handleSignup(email, password, name)
    if (res?.error) {
      setMessage(res.error)
    } else {
      setMessage("")
      alert(res.info)
      navigate("/who")
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-md max-w-md mx-auto mt-10"
    >
      <h2 className="text-xl font-bold mb-2 text-center">Parent Signup</h2>
      <input
        type="text"
        placeholder="Full name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 rounded"
      />
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
      <button type="submit" className="bg-green-600 text-white py-2 rounded hover:bg-green-700">
        Sign Up
      </button>
      <Link to="/login" className="text-blue-600 underline text-sm text-center">
        Already have an account? Log in
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
