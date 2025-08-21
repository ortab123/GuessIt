import { useState } from "react"
import { supabase } from "../../services/supabaseClient"
import { useAuth } from "../../context/AuthContext"

export default function SettingsTab() {
  const { user } = useAuth()
  const [userName, setUserName] = useState("")
  const [email, setEmail] = useState(user?.email || "")
  const [password, setPassword] = useState("")
  const [msg, setMsg] = useState("")

  const handleUpdate = async () => {
    setMsg("")

    const updates = {}
    if (email) updates.email = email
    if (password) updates.password = password

    if (Object.keys(updates).length > 0) {
      const { error: authError } = await supabase.auth.updateUser(updates)
      if (authError) return setMsg(authError.message)
    }

    if (userName) {
      const userId = user?.id
      const { error: dbError } = await supabase.from("Users").update({ userName }).eq("id", userId)

      if (dbError) return setMsg(dbError.message)
    }

    setMsg("Account updated successfully!")
  }

  return (
    <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/30">
      <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
        Settings
      </h2>

      <div className="space-y-3">
        <input
          type="text"
          placeholder="New name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="w-full border rounded-lg px-3 py-2"
        />
        <input
          type="email"
          placeholder="New email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded-lg px-3 py-2"
        />
        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded-lg px-3 py-2"
        />

        <button
          onClick={handleUpdate}
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 shadow-md hover:shadow-lg transition"
        >
          Update Account
        </button>

        {msg && <p className="text-sm text-gray-600 mt-2">{msg}</p>}
      </div>
    </div>
  )
}
