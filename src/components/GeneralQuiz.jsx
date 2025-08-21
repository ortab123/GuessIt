import React, { useEffect, useState } from "react"
import { supabase } from "../services/supabaseClient.js"
import QuestionCard from "./QuestionCard.jsx"

const GeneralQuiz = () => {
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)

      const { data, error } = await supabase.from("users_images").select("*")

      if (error) {
        setError(error.message)
      } else {
        setQuestions(data)
      }
      setLoading(false)
    }

    fetchData()
  }, [])

  const handleAnswer = () => {
    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1)
    }, 1000)
  }

  if (loading) return <div>Loading…</div>
  if (error) return <div>❌ {error}</div>
  if (questions.length === 0) return <div>No questions found</div>

  return <div>{questions && currentIndex < questions.length ? <QuestionCard question={questions[currentIndex]} onAnswer={handleAnswer} /> : <div>🎉 Quiz finished!</div>}</div>
}

export default GeneralQuiz
