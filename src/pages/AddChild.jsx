import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { addChild, fetchChildrenForParent } from "../services/children"
import { useAuth } from "../context/AuthContext"

export default function AddChild() {
  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [message, setMessage] = useState("")
  const [children, setChildren] = useState([])
  const navigate = useNavigate()
  const { user } = useAuth()

  useEffect(() => {
    async function getChildren() {
      if (user) {
        const { data, error } = await fetchChildrenForParent(user.id)
        if (!error) setChildren(data)
      }
    }
    getChildren()
  }, [user])

  async function handleSubmit(e) {
    e.preventDefault()
    const { data, error } = await addChild(name, age)
    if (error) {
      setMessage(`❌ ${error}`)
    } else {
      setMessage("")
      alert(`Child "${name}" added successfully!`)
      setName("")
      setAge("")
      // Refetch children after adding
      if (user) {
        const { data: updatedChildren } = await fetchChildrenForParent(user.id)
        setChildren(updatedChildren)
      }
      navigate("/who")
    }
  }

  return (
    <div>
      <h2>Add Child</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </div>

        <div>
          <label>Age: </label>
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} required />
        </div>

        <button type="submit">Add</button>
      </form>
      {message && <div style={{ color: "red", marginTop: "10px" }}>{message}</div>}
    </div>
  )
}
