import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Header from "./Header";
import NavigationTabs from "./NavigationTabs";
import OverviewTab from "./OverviewTab";
import ChildrenTab from "./ChildrenTab";
import AnalyticsTab from "./AnalysticsTab";
import SettingsTab from "./SettingsTab";

export default function ParentDashboard({ onBack }) {
  const { state, handleLogout } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  const children = [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50">
      {/* Header Component */}
      <Header
        userEmail={state.session?.user?.email}
        onLogout={handleLogout}
        onBack={onBack}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Content Area - מציג את הטאב הפעיל */}
        <div className="space-y-6">
          {activeTab === "overview" && <OverviewTab children={children} />}
          {activeTab === "children" && <ChildrenTab children={children} />}
          {activeTab === "analytics" && <AnalyticsTab children={children} />}
          {activeTab === "settings" && <SettingsTab />}
        </div>
      </div>
    </div>
  );
}
