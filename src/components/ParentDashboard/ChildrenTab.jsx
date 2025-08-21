import ChildCard from "./ChildCard";
import { useChildren } from "../../context/ChildrenContext";
import AddChild from "../../pages/AddChild";
import { useState } from "react";

export default function ChildrenTab() {
  const { childList, deleteChild } = useChildren();

  const handleDelete = async (child) => {
    await deleteChild(child.id);
  };

  return (
    <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/30">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Manage Children
        </h2>
      </div>

      <div className="mb-6">
        <AddChild />
      </div>

      {childList.length === 0 ? (
        <p className="text-gray-500">No children added yet.</p>
      ) : (
        <div className="space-y-3">
          {childList.map((child) => (
            <ChildCard
              key={child.id}
              child={child}
              onEdit={() => console.log("Edit child", child)}
              onDelete={() => handleDelete(child)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
