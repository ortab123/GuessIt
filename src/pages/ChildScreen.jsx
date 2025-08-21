import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getChildById } from "../services/children.js"
import GeneralQuiz from "../components/GeneralQuiz.jsx"
import APIQuiz from "../components/APIQuiz.jsx"

const CATEGORIES = ["Dogs", "General Knowledge"]

export default function ChildScreen() {
  const { id } = useParams()
  const [child, setChild] = useState(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState("Dogs")

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      const { data, error } = await getChildById(id)
      if (error) setError(error)
      else setChild(data)
      setLoading(false)
    })()
  }, [id])

  if (loading) return <div>Loading…</div>
  if (error) return <div>❌ {error}</div>
  if (!child) return <div>Child not found</div>

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-4 mb-6">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              disabled={category === c}
              className={`px-4 py-2 rounded-lg shadow-md font-semibold transition-all duration-200 ${
                category === c
                  ? "bg-blue-500 text-white"
                  : "bg-white text-blue-600 hover:bg-blue-100"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="mt-6">
          {category === "Dogs" && <APIQuiz child={child} />}
          {category === "General Knowledge" && <GeneralQuiz child={child} />}
        </div>
      </div>
    </div>
  )
}
