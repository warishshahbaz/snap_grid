import React, { useState, useEffect } from "react";
import { useLoaderData } from "@remix-run/react";
import { LoaderFunction } from "@remix-run/node";
import { FiArrowRight } from "react-icons/fi";
import { IoArrowBackSharp } from "react-icons/io5";
import QuizScore from "~/components/scoreCard";
import { MdOutlineAccessTime } from "react-icons/md";

interface Question {
  id: number;
  name: string;
  correctAnswer: string;
  options: string[];
}

export const loader: LoaderFunction = async () => {
  const response = await fetch(
    "https://the-trivia-api.com/v2/questions?limit=4"
  );
  if (!response.ok) {
    throw new Error("Failed to fetch trivia questions");
  }
  const data = await response.json();

  const questions: Question[] = data.map((item: any, index: number) => ({
    id: index + 1,
    name: item.question.text,
    correctAnswer: item.correctAnswer,
    options: [...item.incorrectAnswers, item.correctAnswer].sort(
      () => Math.random() - 0.5
    ),
  }));

  return { questions };
};

export default function Index() {
  const { questions } = useLoaderData<{ questions: Question[] }>();
  return <ViewUser questions={questions} />;
}

interface ViewUserProps {
  questions: Question[];
}

const ViewUser: React.FC<ViewUserProps> = ({ questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: number]: string;
  }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes timer

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsSubmitted(true); // Submit when timer expires
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const handleOptionClick = (option: string) => {
    setSelectedOptions({
      ...selectedOptions,
      [currentQuestion.id]: option,
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsSubmitted(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const calculateResult = () => {
    let score = 0;
    for (const question of questions) {
      if (selectedOptions[question.id] === question.correctAnswer) {
        score++;
      }
    }
    return score;
  };

  if (isSubmitted) {
    const score = calculateResult();
    return <QuizScore score={score} totalQuestions={questions.length} />;
  }

  const progressPercentage =
    ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="w-full sm:h-[96vh] h-screen flex flex-col items-center sm:mt-5">
      {/* Timer Display */}
      {/* <div className="text-center text-red-500 font-bold text-lg mb-4">
      <MdOutlineAccessTime /> {formatTime(timeLeft)}
      </div> */}

      {/* Header with progress bar */}
      <div className="sm:w-[500px] w-full bg-slate-100 rounded-md h-[60px] flex flex-col justify-center items-center px-4 py-2">
        <div className="flex justify-between w-full items-center ">
          <div className="flex gap-2">
            <IoArrowBackSharp color="gray" onClick={handlePreviousQuestion} />
            <FiArrowRight color="gray" onClick={handleNextQuestion} />
          </div>
          <div className=" flex items-center text-red-500 font-bold gap-3 ">
            <MdOutlineAccessTime color="gray" />
            <p>{formatTime(timeLeft)}</p>
          </div>
          <div>
            {currentQuestionIndex + 1} / {questions.length}
          </div>
        </div>
      </div>

      <div className="sm:w-[500px] w-full bg-gray-300 h-[5px] overflow-hidden">
        <div
          className="h-full bg-green-500 transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>

      <div className="sm:w-[500px] w-full flex p-2 my-3 mt-4">
        <p className="font-semibold md:text-2xl text-[20px] mr-2">Q.</p>
        <h2 className="font-semibold md:text-[22px] text-[16px]">
          {currentQuestion?.name ?? ""}
        </h2>
      </div>

      <div className="sm:w-[400px] w-full flex flex-wrap justify-center sm:p-3 gap-3">
        {currentQuestion?.options?.map((option) => (
          <div
            key={option}
            onClick={() => handleOptionClick(option)}
            className={`w-[47%] h-[100px] flex justify-center items-center p-5 ${
              selectedOptions[currentQuestion.id] === option
                ? "bg-green-200"
                : "bg-gray-100"
            } rounded-xl text-center xl:text-[17px] md:text-[16px] text-[13px] font-semibold cursor-pointer`}
          >
            {option}
          </div>
        ))}
      </div>

      <button
        onClick={handleNextQuestion}
        className="w-[400px] mt-4 rounded-md text-center flex justify-center text-white bg-red-500 h-[50px] items-center p-2"
        disabled={!selectedOptions[currentQuestion.id]}
      >
        {currentQuestionIndex < questions.length - 1
          ? "Check Your Answer "
          : "Submit"}
      </button>
      <p className="my-3">
        <span className="text-gray-400 mr-2">Powered By</span>
        <span className="text-black font-semibold">Chaabi</span>
      </p>
    </div>
  );
};
