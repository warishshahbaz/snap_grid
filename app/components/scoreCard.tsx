import React from "react";

interface QuizScoreProps {
  score: number;
  totalQuestions: number;
}

const QuizScore: React.FC<QuizScoreProps> = ({ score, totalQuestions }) => {
  const percentage = Math.round((score / totalQuestions) * 100);

  return (
    <div className="w-full h-[96vh] flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white">
      <div className="w-[400px] bg-white rounded-lg shadow-lg p-8 text-center text-gray-800">
        <h2 className="text-3xl font-bold mb-4 text-purple-600">
          Quiz Completed!
        </h2>
        <p className="text-lg font-semibold mb-2">
          You scored <span className="text-blue-500">{score}</span> out of{" "}
          <span className="text-blue-500">{totalQuestions}</span>.
        </p>
        <div className="my-4">
          <div className="text-lg font-bold mb-2">Your Performance:</div>
          <div className="w-full bg-gray-200 h-[8px] rounded-full overflow-hidden">
            <div
              className={`h-full ${
                percentage >= 75
                  ? "bg-green-500"
                  : percentage >= 50
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
          <p className="mt-2 text-sm text-gray-500">
            {percentage}% of the questions were answered correctly.
          </p>
        </div>
        <div>
          {percentage >= 75 && (
            <p className="text-green-500 font-bold">🎉 Excellent Work!</p>
          )}
          {percentage >= 50 && percentage < 75 && (
            <p className="text-yellow-500 font-bold">
              ✨ Good Job! Keep Practicing!
            </p>
          )}
          {percentage < 50 && (
            <p className="text-red-500 font-bold">😔 Better luck next time!</p>
          )}
        </div>
        <button
          className="mt-6 bg-purple-500 text-white py-2 px-6 rounded-lg hover:bg-purple-600 transition duration-300"
          onClick={() => window.location.reload()} // Reloads the quiz
        >
          Try Again
        </button>
      </div>
      <p className="mt-6 text-sm">
        Powered by <span className="font-bold text-white">Chaabi</span>
      </p>
    </div>
  );
};

export default QuizScore;
