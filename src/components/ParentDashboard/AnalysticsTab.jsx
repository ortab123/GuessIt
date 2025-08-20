export default function AnalyticsTab({ children }) {
  return (
    <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/30">
      <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
        Analytics
      </h2>
      {children.length === 0 ? (
        <p className="text-gray-500">
          No data available yet. Add children to see analytics.
        </p>
      ) : (
        <p className="text-gray-700">
          Here you can display charts or progress reports in the future.
        </p>
      )}
    </div>
  );
}
