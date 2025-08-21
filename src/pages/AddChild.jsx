// src/components/AddChild.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addChild } from "../services/child"; 

export default function AddChild() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const { data, error } = await addChild(name, age);

    if (error) {
      setMessage(`❌ ${error}`);
    } else {
        alert(`Child "${name}" added successfully!`); 
        navigate("/who");
        setName("");
        setAge("");
    }
  }

  return (
    <div>
      <h2>Add Child</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Age: </label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>

        <button type="submit">Add</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}
