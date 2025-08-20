import { supabase } from "./supabaseClient";

export async function signUpParent(email, password, name) {
  console.log("SIGNUP INPUT:", email, password, name);
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError) {
    return { error: authError.message };
  }

  const userId = authData.user?.id;

  if (userId) {
    const { error: dbError } = await supabase.from("Users").insert([
      {
        id: userId,
        email,
        name,
      },
    ]);

    if (dbError) {
      return { error: dbError.message };
    }
  }

  return { data: authData.user };
}

export async function signInParent(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  return { data: data.user };
}

export async function signOutParent() {
  const { error } = await supabase.auth.signOut();
  if (error) return { error: error.message };
  return { success: true };
}
