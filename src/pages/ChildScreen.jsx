import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getChildById } from "../services/children.js"

const CATEGORIES = ["Dogs", "General Knowledge"]

export default function ChildScreen() {
  const { id } = useParams()
  const navigate = useNavigate()
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
    <div>
      <div className="child-header">
        <h2>Hello {child.name}</h2>
      </div>

      <div>
        {CATEGORIES.map((c) => (
          <button key={c} onClick={() => setCategory(c)} disabled={category === c} style={{ marginRight: 8 }}>
            {c}
          </button>
        ))}
      </div>
    </div>
  )
}
