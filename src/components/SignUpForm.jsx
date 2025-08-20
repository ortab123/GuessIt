import { useAuth } from "../context/AuthContext";

export default function SignupForm({ goBack }) {
  const { state, dispatch, handleSignup } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignup();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Parent Signup</h2>
      <input
        type="text"
        placeholder="Full name"
        value={state.name}
        onChange={(e) =>
          dispatch({ type: "SET_FIELD", field: "name", value: e.target.value })
        }
      />
      <input
        type="email"
        placeholder="Email"
        value={state.email}
        onChange={(e) =>
          dispatch({ type: "SET_FIELD", field: "email", value: e.target.value })
        }
      />
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
      />
      <button type="submit">Sign Up</button>
      {goBack && (
        <button type="button" onClick={goBack}>
          Back
        </button>
      )}
      {state.message && <p>{state.message}</p>}
    </form>
  );
}
