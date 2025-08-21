export async function fetchChildrenForParent(parentId) {
  const { data, error } = await supabase
    .from("Children")
    .select("id,name,age")
    .eq("parent_id", parentId)
    .order("created_at", { ascending: true })
  return { data, error }
}
import { supabase } from "./supabaseClient"

export async function addChild(name, age) {
  //The parent is the logged in user
  const {
    data: { user },
    error: userErr,
  } = await supabase.auth.getUser()
  if (userErr) return { error: userErr.message }
  if (!user) return { error: "Not logged in" }

  const { data, error } = await supabase
    .from("Children")
    .insert([
      {
        parent_id: user.id,
        name: name?.trim(),
        age: Number(age),
      },
    ])
    .select()
    .single()

  if (error) return { error: error.message }
  return { data }
}

export async function getChildById(id) {
  const { data, error } = await supabase
    .from("Children")
    .select("id,name,age,parent_id")
    .eq("id", id)
    .single()

  if (error) return { error: error.message }
  return { data }
}
