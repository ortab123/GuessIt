import { supabase } from "./supabaseClient"

export async function signUpParent(email, password, userName) {
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  })

  if (authError) {
    return { error: authError.message }
  }

  const userId = authData.user?.id

  if (userId) {
    const { error: dbError } = await supabase.from("Users").insert([
      {
        id: userId,
        email,
        userName,
      },
    ])

    if (dbError) {
      return { error: dbError.message }
    }
  }
  await supabase.auth.signOut()
  return {
    data: authData.user,
    info: "Signup successful. Please log in with your new account.",
  }
  // return { data: authData.user };
}

export async function signInParent(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }
  return { data: data.user }
}

export async function signOutParent() {
  const { error } = await supabase.auth.signOut()
  if (error) return { error: error.message }
  return { success: true }
}
