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
    <div className="flex flex-col items-center mt-4 w-агдд">
      <div>
        {CATEGORIES.map((c) => (
          <button key={c} onClick={() => setCategory(c)} disabled={category === c} style={{ marginRight: 8 }}>
            {c}
          </button>
        ))}

        <div className="mt-6">
          {category === "Dogs" && <APIQuiz child={child} />}
          {category === "General Knowledge" && <GeneralQuiz child={child} />}
        </div>
      </div>
    </div>
  )
}
