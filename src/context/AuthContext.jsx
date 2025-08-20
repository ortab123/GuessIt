import { createContext, useContext, useReducer, useEffect } from "react";
import { supabase } from "../services/supabaseClient";
import { signUpParent, signInParent, signOutParent } from "../services/auth";

const AuthContext = createContext();

const initialState = {
  session: null,
  email: "",
  password: "",
  name: "",
  message: "",
};

function authReducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };

    case "SET_MESSAGE":
      return { ...state, message: action.message };

    case "SET_SESSION":
      return { ...state, session: action.session };

    case "RESET_FIELDS":
      return { ...state, email: "", password: "", name: "" };

    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      dispatch({ type: "SET_SESSION", session: data.session });
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        dispatch({ type: "SET_SESSION", session });
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  async function handleSignup() {
    const { email, password, name } = state;
    const { data, error } = await signUpParent(email, password, name);
    if (error) {
      dispatch({ type: "SET_MESSAGE", message: error });
      return { ok: false, error };
    } else {
      dispatch({ type: "SET_MESSAGE", message: "" });
      dispatch({ type: "RESET_FIELDS" });
      return { ok: true, info: "Signup successful! You can log in now." };
    }
  }

  async function handleLogin() {
    const { email, password } = state;
    const { data, error } = await signInParent(email, password);
    if (error) {
      dispatch({ type: "SET_MESSAGE", message: error });
    } else {
      dispatch({ type: "SET_MESSAGE", message: "Login successful!" });
      dispatch({ type: "RESET_FIELDS" });
    }
  }

  async function handleLogout() {
    const { error } = await signOutParent();
    if (error) {
      dispatch({ type: "SET_MESSAGE", message: error });
    } else {
      dispatch({ type: "SET_MESSAGE", message: "Logged out successfully." });
    }
  }

  return (
    <AuthContext.Provider
      value={{ state, dispatch, handleSignup, handleLogin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
