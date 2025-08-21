import React, { useEffect, useState } from "react"
import { supabase } from "../services/supabaseClient.js"
import QuestionCard from "./QuestionCard.jsx"
import { useParams } from "react-router-dom"

const GeneralQuiz = () => {
  const { id: childId } = useParams()
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const [startTime, setStartTime] = useState(null)
  const [finished, setFinished] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const { data, error } = await supabase.from("users_images").select("*")
      if (error) {
        setError(error.message)
      } else {
        setQuestions(data)
        setStartTime(Date.now())
      }
      setLoading(false)
    }

    fetchData()
  }, [])

  const updateStats = async (isCorrect) => {
    const { data, error: selectError } = await supabase
      .from("Children")
      .select("correct_answers, wrong_answers")
      .eq("id", childId)
      .single()

    if (selectError) {
      console.error(selectError.message)
      return
    }

    const newCorrect = isCorrect ? data.correct_answers + 1 : data.correct_answers
    const newWrong = !isCorrect ? data.wrong_answers + 1 : data.wrong_answers

    const { error: updateError } = await supabase
      .from("Children")
      .update({
        correct_answers: newCorrect,
        wrong_answers: newWrong,
      })
      .eq("id", childId)

    if (updateError) {
      console.error(updateError.message)
    }
  }

  const finishGame = async () => {
    if (!startTime || finished) return
    setFinished(true)

    const durationSec = Math.floor((Date.now() - startTime) / 1000)

    //get previous total play time
    const { data, error } = await supabase
      .from("Children")
      .select("total_play_time")
      .eq("id", childId)
      .single()

    if (error) {
      console.error(error.message)
      return
    }

    const newTime = (data?.total_play_time || 0) + durationSec

    //set new total play time
    const { error: updateError } = await supabase
      .from("Children")
      .update({ total_play_time: newTime })
      .eq("id", childId)

    if (updateError) {
      console.error(updateError.message)
    }
  }

  const handleAnswer = async (isCorrect) => {
    await updateStats(isCorrect)

    if (currentIndex + 1 < questions.length) {
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1)
      }, 1000)
    } else {
      await finishGame()
      setCurrentIndex((prev) => prev + 1)
    }
  }

  //Close window listener
  useEffect(() => {
    const handleUnload = async () => {
      await finishGame()
    }

    window.addEventListener("beforeunload", handleUnload)
    return () => {
      window.removeEventListener("beforeunload", handleUnload)
    }
  }, [startTime, finished])

  if (loading) return <div>Loading…</div>
  if (error) return <div>❌ {error}</div>
  if (questions.length === 0) return <div>No questions found</div>

  return (
    <div>
      {questions && currentIndex < questions.length ? (
        <QuestionCard question={questions[currentIndex]} onAnswer={handleAnswer} />
      ) : (
        <div>🎉 Quiz finished!</div>
      )}
    </div>
  )
}

export default GeneralQuiz
