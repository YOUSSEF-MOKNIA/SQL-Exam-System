import React, { useState, useEffect } from "react";
import QuestionCard from "./QuestionCard";

const ExamDisplay = ({ exam, onReset }) => {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [parsedQuestions, setParsedQuestions] = useState([]);

  useEffect(() => {
    console.log("Raw Exam Data:", exam);

    const questions = exam.questions.map((q, index) => {
      console.log(`Raw Question ${index + 1}:`, q);

      let cleanedData = q.question_data.replace(/^[^\{]*\{([\s\S]*)\}[^\}]*$/, "$1");
      cleanedData = cleanedData.replace(/[\u0000-\u001F\u007F-\u009F]/g, ""); // Remove control characters
      cleanedData = cleanedData.replace(/\\"/g, '"'); // Handle escaped quotes
      cleanedData = cleanedData.replace(/"([^"]*?)"/g, (match, group) =>
        group.includes('"') ? `"${group.replace(/"/g, '\\"')}"` : match
      ); // Escape improperly nested double quotes

      try {
        console.log(`Cleaned Data for Question ${index + 1}:`, cleanedData);
        const questionData = JSON.parse(`{${cleanedData}}`);

        return {
          ...q,
          ...questionData,
        };
      } catch (error) {
        console.error(`Error parsing JSON for Question ${index + 1}:`, error, cleanedData);
        return {
          ...q,
          error: "Invalid question data format. Could not parse.",
        };
      }
    });

    setParsedQuestions(questions);
  }, [exam]);

  const handleAnswerChange = (questionIndex, answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: answer,
    }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const handleReinitialize = () => {
    setAnswers({}); // Clear previous answers
    setSubmitted(false); // Hide results
  };

  const correctAnswers = parsedQuestions.filter(
    (q, index) => answers[index] === q.correct_answer
  ).length;

  return (
    <div className="space-y-6">
      {/* Back Arrow Button */}
      <div className="flex items-center space-x-2 cursor-pointer" onClick={onReset}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 text-black"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        <span className="text-black text-base font-semibold">Retourner en arrière</span>
      </div>

      {/* Title Row with Reinitialize Icon */}
      <div className="flex items-center justify-between">
        <h2 className="text-4xl font-bold text-indigo-600">
          Examen généré :{" "}
          <span className="font-medium text-black text-2xl">
            {parsedQuestions.length} questions
          </span>
        </h2>

        {/* Reinitialize Button */}
        <button
          className="flex items-center space-x-1 text-indigo-600 hover:text-indigo-800"
          onClick={handleReinitialize}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 4v6h6M20 20v-6h-6M5 19l14-14"
            />
          </svg>
          <span className="font-medium">Réinitialiser</span>
        </button>
      </div>

      {/* Display all questions */}
      {parsedQuestions.map((question, index) => (
        <QuestionCard
          key={index}
          question={question}
          index={index}
          onAnswerChange={handleAnswerChange}
          submitted={submitted}
          userAnswer={answers[index]}
        />
      ))}

      {/* Submit Button */}
      {!submitted && (
        <div className="flex justify-center mt-4">
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Soumettre les réponses
          </button>
        </div>
      )}

      {/* Result Section */}
      {submitted && (
        <div className="text-center mt-6">
          <h3 className="text-xl font-medium text-gray-700 mb-4">Résultat</h3>
          <div className="text-3xl font-bold text-indigo-700">
            {correctAnswers} / {parsedQuestions.length}
          </div>
          <p className="text-lg text-gray-500 mt-2">
            Vous avez répondu correctement à{" "}
            <span className="font-semibold text-indigo-600">{correctAnswers}</span>{" "}
            questions sur{" "}
            <span className="font-semibold text-indigo-600">{parsedQuestions.length}</span>.
          </p>
        </div>
      )}
    </div>
  );
};

export default ExamDisplay;
