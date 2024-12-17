import React, { useState, useEffect } from "react";
import QuestionCard from "./QuestionCard";
import axios from "axios";

const ExamDisplay = ({ exam, onReset }) => {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [parsedQuestions, setParsedQuestions] = useState([]);

  useEffect(() => {
    const questions = exam.questions.map((q) => {
      // Clean the question_data by extracting only the content inside the braces
      let cleanedData = q.question_data.replace(/^[^\{]*\{([\s\S]*)\}[^\}]*$/, "$1"); // Keep only content inside {}

      // Escape problematic characters (e.g., newline, carriage return, tabs, etc.)
      cleanedData = cleanedData.replace(/[\u0000-\u001F\u007F-\u009F]/g, ""); // Remove control characters
      cleanedData = cleanedData.replace(/\\"/g, '"'); // Handle escaped quotes if needed

      // Parse the cleaned JSON string
      try {
        const questionData = JSON.parse(`{${cleanedData}}`);  // Wrap the cleanedData to ensure it's valid JSON

        return {
          ...q,  // Keep other properties (like source_content, type, etc.)
          ...questionData,  // Merge the parsed data
        };
      } catch (error) {
        console.error("Error parsing JSON:", error);
        return q;  // Return the original data if parsing fails
      }
    });

    setParsedQuestions(questions);  // Update the state with parsed questions
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

  const correctAnswers = parsedQuestions.filter(
    (q, index) => answers[index] === q.correct_answer
  ).length;

  return (
    <div className="space-y-6">
      {/* Back Arrow Button to reset the exam */}
      <div className="flex items-center space-x-2 cursor-pointer" onClick={onReset}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 text-indigo-600"
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
        <span className="text-indigo-600 text-lg font-semibold">Retour aux questions</span>
      </div>

      {/* Title */}
      <h2 className="text-4xl font-bold text-indigo-600 mt-6">
        Examen généré : {parsedQuestions.length} questions
      </h2>

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

      {/* Button to submit answers */}
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
            <span className="font-semibold text-indigo-600">{parsedQuestions.length}</span> .
          </p>
        </div>
      )}
    </div>
  );
};

export default ExamDisplay;
