import React, { useEffect, useState } from "react";

const QuestionCard = ({ question, onAnswer }) => {
  const [shuffled, setShuffled] = useState([]);
  const [correctIndex, setCorrectIndex] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    if (question?.urls) {
      const correctUrl = question.urls[0];
      const shuffledArr = [...question.urls];

      for (let i = shuffledArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArr[i], shuffledArr[j]] = [shuffledArr[j], shuffledArr[i]];
      }

      setShuffled(shuffledArr);
      setCorrectIndex(shuffledArr.indexOf(correctUrl));
      setSelectedIndex(null);
    }
  }, [question]);

  const handleClick = (idx) => {
    setSelectedIndex(idx);
    onAnswer(idx === correctIndex);
  };

  return (
    <div className="flex flex-col gap-1 bg-white/60 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/30">
      <div
        className="p-4 rounded shadow max-w-lg mx-auto"
        style={{ width: 480, minHeight: 420 }}
      >
        <h3 className="text-lg font-bold mb-4 text-center">
          {question.question}
        </h3>

        <div className="grid grid-cols-2 gap-4">
          {shuffled.map((url, idx) => {
            let borderColor = "border-transparent";
            if (selectedIndex !== null) {
              if (idx === selectedIndex) {
                borderColor =
                  idx === correctIndex ? "border-green-500" : "border-red-500";
              }
            }

            return (
              <div
                key={idx}
                onClick={() => handleClick(idx)}
                className={`cursor-pointer border-4 rounded-lg overflow-hidden shadow-md hover:shadow-[0_0_10px_3px_black] transition ${borderColor}`}
                style={{
                  width: 200,
                  height: 200,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={url}
                  alt={`Option ${idx}`}
                  className="object-contain bg-white"
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
