// import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { supabase } from "../services/supabaseClient";

// export default function WhoIsPlaying() {
//   const navigate = useNavigate();
//   const [children, setChildren] = useState([]);
//   const [err, setErr] = useState("");

//   useEffect(() => {
//     setErr("");
//     // Fetch the list of children
//     const fetchChildren = async () => {
//       const { data: { user }, error: userErr } = await supabase.auth.getUser();
//       if (userErr) { setErr(userErr.message); return; }
//       if (!user)    { setErr("Not logged in"); return; }

//       const { data, error } = await supabase
//         .from("Children")
//         .select("id,name,age")
//         .eq("parent_id", user.id)
//         .order("created_at", { ascending: true });

//       if (error) setErr(error.message);
//       else setChildren(data || []);
//     };
//     fetchChildren();
//   }, []);

//   return (
//     <div className="who-container">
//         <h2>Who’s playing?</h2>

//         <div className="who-card">
//           <button className="player" onClick={() => navigate("/parent")}>
//             <div className="parent">👤</div>
//             <span>Parent</span>
//           </button>

//           {err && <div>{err}</div>}

//           {children.map((c) => (
//           <button
//             key={c.id}
//             className="player"
//             onClick={() => navigate(`/child/${c.id}`)}
//           >
//             <div className="child">👦</div>
//             <span>{c.name}</span>
//           </button>
//         ))}

//           <button className="player" onClick={() => navigate("/add")}>
//             <div className="plus">＋</div>
//             <span>Plus</span>
//           </button>
//         </div>
//       </div>
//   );
// }

import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext"
import { supabase } from "../services/supabaseClient"

export default function WhoIsPlaying() {
  const navigate = useNavigate()
  const { state } = useAuth()
  const [children, setChildren] = useState([])
  const [err, setErr] = useState("")

  useEffect(() => {
    if (!state.session) {
      navigate("/login")
      return
    }
    setErr("")
    // Fetch the list of children
    const fetchChildren = async () => {
      const {
        data: { user },
        error: userErr,
      } = await supabase.auth.getUser()
      if (userErr) {
        setErr(userErr.message)
        return
      }
      if (!user) {
        setErr("Not logged in")
        return
      }

      const { data, error } = await supabase.from("Children").select("id,name,age").eq("parent_id", user.id).order("created_at", { ascending: true })

      if (error) setErr(error.message)
      else setChildren(data || [])
    }
    fetchChildren()
  }, [state.session, navigate])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Who is playing?</h2>
        <div className="flex flex-wrap gap-6 justify-center">
          <button
            className="player flex flex-col items-center px-6 py-4 bg-white rounded-lg shadow-md hover:bg-blue-100 transition cursor-pointer"
            onClick={() => navigate("/parent")}
          >
            <div className="parent text-4xl mb-2">👤</div>
            <span className="font-semibold">Parent</span>
          </button>

          {children.map((c) => (
            <button
              key={c.id}
              className="player flex flex-col items-center px-6 py-4 bg-white rounded-lg shadow-md hover:bg-blue-100 transition cursor-pointer"
              onClick={() => navigate(`/child/${c.id}`)}
            >
              <div className="child text-4xl mb-2">👦</div>
              <span className="font-semibold">{c.name}</span>
            </button>
          ))}

          <button
            className="player flex flex-col items-center px-6 py-4 bg-white rounded-lg shadow-md hover:bg-green-100 transition cursor-pointer"
            onClick={() => navigate("/add")}
          >
            <div className="plus text-4xl mb-2">＋</div>
            <span className="font-semibold">Add Child</span>
          </button>
        </div>
        {err && <div className="text-red-500 text-center mt-4">{err}</div>}
      </div>
    </div>
  )
}
