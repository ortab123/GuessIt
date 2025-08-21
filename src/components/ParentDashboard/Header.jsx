export default function Header({ userEmail, onLogout, onBack }) {
  return (
    <header className="bg-white/80 backdrop-blur-lg border-b border-white/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo and title */}
          <div className="flex items-center space-x-4">
            {/* Back Button */}
            <button
              onClick={onBack}
              className="p-2 rounded-lg text-gray-500 hover:text-purple-600 hover:bg-purple-50 transition-all duration-200"
            >
              ← Back
            </button>

            <div className="absolute left-1/2 transform -translate-x-1/2">
              <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                GuessIt
              </div>
            </div>
            {/* <span className="text-sm text-gray-500">Parent Dashboard</span> */}
          </div>

          {/* Right side - User info and logout */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onLogout}
              className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg hover:from-red-600 hover:to-pink-600 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
