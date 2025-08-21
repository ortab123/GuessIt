export default function ChildCard({ child, onEdit, onDelete }) {
  return (
    <div className="flex justify-between items-center p-4 rounded-xl bg-white/70 border border-gray-200 shadow-md hover:shadow-lg transition-all duration-200">
      <div>
        <h3 className="font-semibold text-lg text-gray-800">{child.name}</h3>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => onDelete(child)}
          className="px-3 py-1 rounded-lg text-sm bg-red-500 text-white hover:bg-red-600 transition"
        >
          Delete
        </button>
      </div>
    </div>
  )
}
