import React from "react";

interface QuestionProps {
  question: string;
  options: { id: number; name: string }[];
  handleOptionClick: (id: number) => void;
  currentQuestion: number;
  totalQuestions: number;
}

const QuizQuestion: React.FC<QuestionProps> = ({
  question,
  options,
  handleOptionClick,
  currentQuestion,
  totalQuestions,
}) => {
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

        {/* Question Header */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-lg font-semibold text-purple-600">
            Question {currentQuestion} of {totalQuestions}
          </p>
          <p className="text-gray-500 text-sm">Powered by Chaabi</p>
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
              onClick={() => handleOptionClick(option)}
              className="w-full bg-gray-100 hover:bg-purple-200 text-gray-800 font-medium py-4 rounded-lg shadow-md transition duration-300"
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizQuestion;
