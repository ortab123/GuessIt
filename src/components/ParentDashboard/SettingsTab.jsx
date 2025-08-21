export default function SettingsTab() {
  return (
    <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/30">
      <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
        Settings
      </h2>
      <p className="text-gray-700">
        Account settings will go here (update email, password, etc.)
      </p>
    </div>
  );
}
