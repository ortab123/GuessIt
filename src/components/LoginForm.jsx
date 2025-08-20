import { useAuth } from "../context/AuthContext";

export default function LoginForm({ goBack }) {
  const { state, dispatch, handleLogin } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Parent Login</h2>
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
      <button type="submit">Login</button>
      {goBack && (
        <button type="button" onClick={goBack}>
          Back
        </button>
      )}

      {state.message && <p>{state.message}</p>}
    </form>
  );
}
