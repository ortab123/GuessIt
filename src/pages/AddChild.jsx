import { useState } from "react";
import { useChildren } from "../context/ChildrenContext";

export default function AddChild({ onAdded }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [message, setMessage] = useState("");
  const { addChild } = useChildren();

  async function handleSubmit(e) {
    e.preventDefault();

    const error = await addChild({ name, age });

    if (error) {
      setMessage(`❌ ${error.message || error}`);
    } else {
      setMessage(`Child "${name}" added successfully!`);
      setName("");
      setAge("");
      if (onAdded) onAdded();
    }
  }
  return (
    <div className="bg-white/60 backdrop-blur-md rounded-2xl p-4 shadow-md border border-white/30">
      <h2 className="text-lg font-bold mb-3 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
        Add Child
      </h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Age
          </label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm"
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 text-white font-medium hover:from-green-600 hover:to-emerald-600 shadow-md hover:shadow-lg transition"
        >
          Add
        </button>
      </form>

      {message && <p className="text-sm mt-3 text-gray-700">{message}</p>}
    </div>
  );
}
