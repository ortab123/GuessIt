export default function NavigationTabs({ activeTab, setActiveTab }) {
  const tabs = [
    { id: "overview", name: "Overview", icon: "📊" },
    { id: "children", name: "Children", icon: "👶" },
    { id: "analytics", name: "Analytics", icon: "📈" },
    { id: "add_quiz", name: "Add Quiz", icon: "➕" },
    { id: "settings", name: "Settings", icon: "⚙️" },
  ]

  return (
    <div className="mb-8">
      <div className="flex flex-wrap gap-1 bg-white/50 backdrop-blur-sm p-1 rounded-xl border border-white/20 shadow-lg overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 min-w-[120px] flex items-center justify-center space-x-2 px-3 py-2 sm:px-4 sm:py-3 rounded-lg transition-all duration-200 whitespace-nowrap ${
              activeTab === tab.id
                ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg transform scale-105"
                : "text-gray-600 hover:bg-white/50 hover:text-purple-600"
            }`}
            style={{ maxWidth: "200px" }}
          >
            <span className="text-lg">{tab.icon}</span>
            <span className="font-medium">{tab.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
