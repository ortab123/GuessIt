export default function NavigationTabs({ activeTab, setActiveTab }) {
  const tabs = [
    // { id: "overview", name: "Overview", icon: "📊" },
    { id: "children", name: "Children", icon: "👶" },
    { id: "analytics", name: "Analytics", icon: "📈" },
    { id: "add_quiz", name: "Add Quiz", icon: "➕" },
    { id: "settings", name: "Settings", icon: "⚙️" },
  ];

  return (
    <div className="mb-8">
      <div className="flex space-x-1 bg-white/50 backdrop-blur-sm p-1 rounded-xl border border-white/20 shadow-lg">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg transition-all duration-200 ${
              activeTab === tab.id
                ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg transform scale-105"
                : "text-gray-600 hover:bg-white/50 hover:text-purple-600"
            }`}
          >
            <span className="text-lg">{tab.icon}</span>
            <span className="font-medium">{tab.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
