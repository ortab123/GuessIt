import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext"
import { supabase } from "../services/supabaseClient"

export default function WhoIsPlaying() {
  const navigate = useNavigate()
  const { session, user, loading } = useAuth()
  const [children, setChildren] = useState([])
  const [err, setErr] = useState("")

  useEffect(() => {
    if (loading) return
    if (!session) {
      navigate("/login")
      return
    }
    setErr("")
    // Fetch the list of children
    const fetchChildren = async () => {
      if (!user) return
      const { data, error } = await supabase
        .from("Children")
        .select("id,name,age,correct_answers,wrong_answers,total_play_time")
        .eq("parent_id", user.id)
        .order("created_at", { ascending: true })
      if (error) {
        console.error("Error fetching children:", error)
        setErr(error.message)
      } else {
        setChildren(data || [])
      }
    }
    fetchChildren()
  }, [session, user, loading, navigate])

  if (loading)
    return <div className="flex justify-center items-center h-screen text-xl">Loading...</div>

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
