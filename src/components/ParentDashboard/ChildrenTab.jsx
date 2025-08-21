import ChildCard from "./ChildCard";

export default function ChildrenTab({ children }) {
  const handleEdit = (child) => {
    console.log("Edit child", child);
  };

  const handleDelete = (child) => {
    console.log("Delete child", child);
  };

  return (
    <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/30">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Manage Children
        </h2>
        <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 shadow-md hover:shadow-lg transition">
          + Add Child
        </button>
      </div>

      {children.length === 0 ? (
        <p className="text-gray-500">No children added yet.</p>
      ) : (
        <div className="space-y-3">
          {children.map((child) => (
            <ChildCard
              key={child.id}
              child={child}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
