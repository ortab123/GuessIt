import { useEffect } from "react";
import { supabase } from "../services/supabaseClient";

export default function TestSupabase() {
  useEffect(() => {
    async function fetchUsers() {
      const { data, error } = await supabase.from("Users").select("*");

      if (error) {
        console.error("Error fetching users:", error.message);
      } else {
        console.log("Users:", data);
      }
    }

    fetchUsers();
  }, []);

  return <div>Check the console for Supabase data!</div>;
}
