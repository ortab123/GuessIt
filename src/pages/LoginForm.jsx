import { useAuth } from "../context/AuthContext"
import { useNavigate, Link } from "react-router-dom"

export default function LoginForm({ goBack }) {
  const { state, dispatch, handleLogin } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await handleLogin()
    if (!state.message.includes("error") && res !== false) {
      navigate("/who")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-md max-w-md mx-auto mt-10">
      <h2 className="text-xl font-bold mb-2 text-center">Parent Login</h2>
      <input type="email" placeholder="Email" value={state.email} onChange={(e) => dispatch({ type: "SET_FIELD", field: "email", value: e.target.value })} className="border p-2 rounded" />
      <input
        type="password"
        placeholder="Password"
        value={state.password}
        onChange={(e) =>
          dispatch({
            type: "SET_FIELD",
            field: "password",
            value: e.target.value,
          })
        }
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
      {state.message && <p className="text-red-500 text-center">{state.message}</p>}
    </form>
  )
}
