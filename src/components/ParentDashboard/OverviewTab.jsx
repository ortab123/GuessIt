export default function OverviewTab({ children }) {
  return (
    <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/30">
      <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
        Overview
      </h2>
      {children.length === 0 ? (
        <p className="text-gray-500">
          No children accounts yet. Add some to get started!
        </p>
      ) : (
        <ul className="space-y-2">
          {children.map((child) => (
            <li
              key={child.id}
              className="flex justify-between items-center p-3 rounded-lg bg-white/70 border border-gray-200 shadow-sm"
            >
              <span className="font-medium">{child.name}</span>
              <span className="text-sm text-gray-500">
                Progress: {child.progress}%
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
