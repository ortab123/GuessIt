import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import { supabase } from "../services/supabaseClient"
import NavigationTabs from "../components/ParentDashboard/NavigationTabs"
import ChildrenTab from "../components/ParentDashboard/ChildrenTab"
import AnalyticsTab from "../components/ParentDashboard/AnalysticsTab"
import SettingsTab from "../components/ParentDashboard/SettingsTab"
import CustomQuiz from "../components/ParentDashboard/CustomQuiz"

export default function ParentDashboard({ onBack }) {
  const { user, handleLogout } = useAuth()
  const [activeTab, setActiveTab] = useState("children")
  const [childList, setChildList] = useState([])
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState("")

  const fetchChildren = async () => {
    setLoading(true)
    setErr("")
    if (!user) {
      setErr("Not logged in")
      setChildList([])
      setLoading(false)
      return
    }
    const { data, error } = await supabase
      .from("Children")
      .select("id,name,age,correct_answers,wrong_answers,total_play_time")
      .eq("parent_id", user.id)
      .order("created_at", { ascending: true })
    if (error) setErr(error.message)
    setChildList(data || [])
    setLoading(false)
  }

  const addChild = async (newChild) => {
    if (!user) return
    const { error } = await supabase.from("Children").insert([
      {
        parent_id: user.id,
        name: newChild.name,
        age: newChild.age,
      },
    ])
    if (!error) await fetchChildren()
    return error
  }

  const deleteChild = async (id) => {
    const { error } = await supabase.from("Children").delete().eq("id", id)
    if (!error) await fetchChildren()
    return error
  }

  useEffect(() => {
    fetchChildren()
  }, [user])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50">
      {/* Header Component */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 overflow-hidden">
        {/* Navigation Tabs */}
        <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Content Area - Active Tab */}
        <div className="space-y-6">
          {activeTab === "children" && (
            <ChildrenTab
              childList={childList}
              loading={loading}
              err={err}
              addChild={addChild}
              deleteChild={deleteChild}
            />
          )}
          {activeTab === "analytics" && <AnalyticsTab children={childList} />}
          {activeTab === "add_quiz" && <CustomQuiz />}
          {activeTab === "settings" && <SettingsTab />}
        </div>
      </div>
    </div>
  )
}
