import React from "react"
import { useState } from "react"
import ImageDropzone from "./ImageDropzone.jsx"

const CustomeQuiz = () => {
  const [quizQuestion, setQuizQuestion] = useState("")

  return (
    <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/30">
      <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Add Quiz</h2>
      <input type="text" className="border border-gray-300 rounded-md p-2 w-full" placeholder="Enter quiz question..." onChange={(e) => setQuizQuestion(e.target.value)} />
      {/* add field to add pictures drag and drop */}
      <ImageDropzone />
    </div>
  )
}

export default CustomeQuiz
