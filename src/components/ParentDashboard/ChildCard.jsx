export default function ChildCard({ child, onEdit, onDelete }) {
  return (
    <div className="flex justify-between items-center p-4 rounded-xl bg-white/70 border border-gray-200 shadow-md hover:shadow-lg transition-all duration-200">
      <div>
        <h3 className="font-semibold text-lg text-gray-800">{child.name}</h3>
        <p className="text-sm text-gray-600">Age: {child.age}</p>

        <p className="text-sm text-gray-500">Progress: {child.progress}%</p>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => onEdit(child)}
          className="px-3 py-1 rounded-lg text-sm bg-blue-500 text-white hover:bg-blue-600 transition"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(child)}
          className="px-3 py-1 rounded-lg text-sm bg-red-500 text-white hover:bg-red-600 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
