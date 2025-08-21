import { useAuth } from "../context/AuthContext"
import { useNavigate, Link } from "react-router-dom"

export default function SignupForm({ goBack }) {
  const { state, dispatch, handleSignup } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await handleSignup()
    if (res?.ok) {
      alert(res.info)
      if (!state.message.includes("error")) {
        navigate("/who")
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-md max-w-md mx-auto mt-10">
      <h2 className="text-xl font-bold mb-2 text-center">Parent Signup</h2>
      <input type="text" placeholder="Full name" value={state.name} onChange={(e) => dispatch({ type: "SET_FIELD", field: "name", value: e.target.value })} className="border p-2 rounded" />
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
      {state.message && <p className="text-red-500 text-center">{state.message}</p>}
    </form>
  )
}
