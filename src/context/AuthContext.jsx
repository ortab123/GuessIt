import { createContext, useContext, useEffect, useState } from "react"
import { supabase } from "../services/supabaseClient"
import { signUpParent, signInParent, signOutParent } from "../services/auth"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setUser(data.session?.user || null)
      setLoading(false)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user || null)
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  async function handleSignup(email, password, name) {
    return await signUpParent(email, password, name)
  }

  async function handleLogin(email, password) {
    return await signInParent(email, password)
  }

  async function handleLogout() {
    await signOutParent()
    setSession(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{ session, user, loading, handleSignup, handleLogin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
