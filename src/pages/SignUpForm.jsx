import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function SignupForm({ goBack }) {
  const { state, dispatch, handleSignup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await handleSignup();
    if (res?.ok) {
      alert(res.info);
      if (!state.message.includes("error")) {
      navigate("/Home");
    }
    }
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
