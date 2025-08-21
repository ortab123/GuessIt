import { useState } from "react";
import NavigationTabs from "../components/ParentDashboard/NavigationTabs";
import ChildrenTab from "../components/ParentDashboard/ChildrenTab";
import AnalyticsTab from "../components/ParentDashboard/AnalyticsTab";
import SettingsTab from "../components/ParentDashboard/SettingsTab";
import CustomQuiz from "../components/ParentDashboard/CustomQuiz";

export default function ParentDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const children = [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="space-y-6">
          {activeTab === "children" && <ChildrenTab children={children} />}
          {activeTab === "analytics" && <AnalyticsTab children={children} />}
          {activeTab === "add_quiz" && <CustomQuiz />}
          {activeTab === "settings" && <SettingsTab />}
        </div>
      </div>
    </div>
  );
}
