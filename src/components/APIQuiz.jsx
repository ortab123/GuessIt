import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBreeds, getImageForBreed } from "../services/dogApi.js";
import { supabase } from "../services/supabaseClient.js";
import QuestionCard from "./QuestionCard.jsx";

const QUIZ_LENGTH = 10; 

const APIQuiz= () => {
  const { id: childId } = useParams();

  const [breeds, setBreeds] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [startTime, setStartTime] = useState(null);
  const [finished, setFinished] = useState(false);

// Get breeds
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const all = await getBreeds(100, 0);
        setBreeds(all);
        setStartTime(Date.now());
      } catch (e) {
        setError(e.message || "Failed to load breeds");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Create a single question
  async function buildQuestion() {
    if (!breeds.length) return null;

    const pick = () => breeds[Math.floor(Math.random() * breeds.length)];
    const correct = pick();

    const wrongs = new Set();
    while (wrongs.size < 3) {
      const cand = pick();
      if (cand.id !== correct.id) wrongs.add(cand);
    }
    const wrongArr = Array.from(wrongs);

    const imgs = await Promise.all([
      getImageForBreed(correct.id),
      ...wrongArr.map(w => getImageForBreed(w.id)),
    ]);

    const correctUrl = imgs[0]?.url;
    const wrongUrls  = imgs.slice(1).map(x => x?.url).filter(Boolean);

    // The question object 
    return {
      question: `Which one is a ${correct.name}?`,
      urls: [correctUrl, ...wrongUrls], 
      meta: { correctBreed: correct.name } 
    };
  }

  // Pre-generate an array of questions
  useEffect(() => {
    if (!breeds.length) return;
    (async () => {
      try {
        setLoading(true);
        const questions = [];
        for (let i = 0; i < QUIZ_LENGTH; i++) {
          const q = await buildQuestion();
          if (q && q.urls.length === 4) questions.push(q);
          //if not enough options, try again
          else i--; 
        }
        setQuestions(questions);
      } catch (e) {
        setError(e.message || "Failed to build questions");
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [breeds]);

  // Update statistics 
  async function updateStats(isCorrect) {
    const breedName = questions[currentIndex]?.meta?.correctBreed || null;
    const { data, error: selectError } = await supabase
      .from("Children")
      .select("correct_answers, wrong_answers, difficult_breed")
      .eq("id", childId)
      .single();

    if (selectError) {
      console.error(selectError.message);
      return;
    }

     const baseCorrect = data?.correct_answers ?? 0;
    const baseWrong   = data?.wrong_answers   ?? 0;
    const newCorrect  = isCorrect ? baseCorrect + 1 : baseCorrect;
    const newWrong    = !isCorrect ? baseWrong + 1 : baseWrong;

    //If wrong, add to difficult breeds
    let difficult = Array.isArray(data?.difficult_breed) ? data.difficult_breed : [];
    if (!isCorrect && breedName && !difficult.includes(breedName)) {
      difficult.push(breedName);
    }
    const { error: updateError } = await supabase
      .from("Children")
      .update({
        correct_answers: newCorrect,
        wrong_answers: newWrong,
        difficult_breed: difficult,
      })
      .eq("id", childId);

    if (updateError) {
      console.error(updateError.message);
    }
  }

  // end of the game - update time played
  async function finishGame() {
    if (!startTime || finished) return;
    setFinished(true);

    const durationSec = Math.floor((Date.now() - startTime) / 1000);
    const { data, error } = await supabase
      .from("Children")
      .select("total_play_time")
      .eq("id", childId)
      .single();

    if (error) {
      console.error(error.message);
      return;
    }

    const newTime = (data?.total_play_time || 0) + durationSec;

    const { error: updateError } = await supabase
      .from("Children")
      .update({ total_play_time: newTime })
      .eq("id", childId);

    if (updateError) {
      console.error(updateError.message);
    }
  }

  const handleAnswer = async (isCorrect) => {
    await updateStats(isCorrect);

    if (currentIndex + 1 < questions.length) {
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, 1000);
    } else {
      await finishGame();
      setCurrentIndex((prev) => prev + 1);
    }
  };

  // Save time even if closing/reloading
  useEffect(() => {
    const onUnload = async () => {
      await finishGame();
    };
    window.addEventListener("beforeunload", onUnload);
    return () => window.removeEventListener("beforeunload", onUnload);
  }, [startTime, finished]); 

  //Component unmount listener
  useEffect(() => {
  return () => {
    if (!finished) {
      finishGame();
    }
  };
}, [finished, startTime]);

  if (loading) return <div>Loading…</div>;
  if (error)   return <div>❌ {error}</div>;
  if (questions.length === 0) return <div>No questions available</div>;

  return (
    <div>
      {currentIndex < questions.length ? (
        <QuestionCard question={questions[currentIndex]} onAnswer={handleAnswer} />
      ) : (
        <div>🎉 Quiz finished!</div>
      )}
    </div>
  );
}
export default APIQuiz

