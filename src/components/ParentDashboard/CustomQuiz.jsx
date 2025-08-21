import React, { useEffect } from "react"
import { useState } from "react"
import ImageDropzone from "./ImageDropzone.jsx"
import { supabase } from "../../services/supabaseClient.js"
import { useAuth } from "../../context/AuthContext.jsx"

const CustomQuiz = () => {
  const [images, setImages] = useState([])
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [quizQuestion, setQuizQuestion] = useState("")
  const [error, setError] = useState(null)
  const [sortedArr, setSortedArr] = useState([])

  useEffect(() => {
    if (selectedIndex !== null) {
      const selectedImage = images[selectedIndex]
      const sortedArr = images.filter((_, i) => i !== selectedIndex)
      sortedArr.unshift(selectedImage)
      setSortedArr(sortedArr)
    }
  }, [selectedIndex, images])

  async function uploadImage(file) {
    const fileName = `${Date.now()}-${file.name}`

    // save into bucket "images"
    const { data, error } = await supabase.storage
      .from("images") // bucket "images"
      .upload(fileName, file)

    if (error) {
      console.error("upload error:", error.message)
      return null
    }

    // public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from("images").getPublicUrl(fileName)

    return publicUrl
  }

  const saveHandler = async () => {
    const userId = await supabase.auth.getUser().then(({ data }) => data.user?.id)

    if (!quizQuestion) {
      setError("Please enter a quiz question.")
      return
    }

    const imagePromises = sortedArr.map((file) => uploadImage(file))
    const imageUrls = await Promise.all(imagePromises)

    if (imageUrls.includes(null)) {
      setError("Some images failed to upload.")
      return
    }

    const { data, error } = await supabase.from("users_images").insert([
      {
        user_id: userId,
        urls: imageUrls,
        question: quizQuestion,
      },
    ])

    if (error) {
      console.error("DB save error:", error.message)
      setError("Failed to save to database.")
      return
    }

    setImages([])
    setSelectedIndex(null)
    setQuizQuestion("")
    setSortedArr([])
    setError(null)

    alert("Quiz saved successfully!")
  }

  return (
    <div className="flex flex-col gap-1 bg-white/60 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/30">
      <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Add Quiz</h2>
      <input type="text" value={quizQuestion} className="border border-gray-300 rounded-md p-2 w-full" placeholder="Enter quiz question..." onChange={(e) => setQuizQuestion(e.target.value)} />

      <ImageDropzone images={images} setImages={setImages} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />

      <button
        className={`rounded-lg px-4 py-2 shadow-md transition
    ${images.length === 4 && selectedIndex !== null ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 hover:shadow-lg" : "bg-gray-300 text-gray-600 cursor-not-allowed opacity-70"}`}
        disabled={images.length !== 4 || selectedIndex === null}
        onClick={saveHandler}
      >
        Save
      </button>

      {error && <p className="text-red-500">{error}</p>}
    </div>
  )
}

export default CustomQuiz
