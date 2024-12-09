import React, { useState, useEffect } from "react";

interface QuestionProps {
  question: string;
  options: { id: number; name: string }[];
  handleOptionClick: (id: number) => void;
  currentQuestion: number;
  totalQuestions: number;
  handleTimeExpire: () => void;
}

const QuizQuestion: React.FC<QuestionProps> = ({
  question,
  options,
  handleOptionClick,
  currentQuestion,
  totalQuestions,
  handleTimeExpire,
}) => {
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          handleTimeExpire(); // Call the function to handle timeout
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup the interval on component unmount
  }, [handleTimeExpire]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <div className="w-full h-[96vh] flex flex-col items-center bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white p-5">
      <div className="w-[90%] md:w-[600px] bg-white rounded-lg shadow-lg p-6 text-gray-800">
        {/* Progress Bar */}
        <div className="relative w-full bg-gray-200 h-[10px] rounded-full overflow-hidden mb-4">
          <div
            className="absolute h-full bg-purple-500"
            style={{ width: `${(currentQuestion / totalQuestions) * 100}%` }}
          ></div>
        </div>

        {/* Question */}
        <h2 className="text-2xl font-bold text-center text-blue-500 mb-6">
          {question}
        </h2>

        {/* Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleOptionClick(option.id)}
              className="w-full bg-gray-100 hover:bg-purple-200 text-gray-800 font-medium py-4 rounded-lg shadow-md transition duration-300"
            >
              {option.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizQuestion;
