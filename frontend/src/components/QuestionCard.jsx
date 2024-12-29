import React, { useState, useEffect } from "react";

const QuestionCard = ({ question, index, onAnswerChange, submitted, userAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(userAnswer || "");

  // Reset the selected answer when answers are reset in the parent component
  useEffect(() => {
    setSelectedAnswer(userAnswer || "");  // Reset when userAnswer changes (like when reinitializing)
  }, [userAnswer]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSelectedAnswer(value);  // Update local state immediately
    onAnswerChange(index, value);  // Notify parent with new answer immediately
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-6 border border-gray-200">
      <h3 className="text-2xl font-bold text-indigo-700 mb-4">Question {index + 1}</h3>
      <p className="text-lg text-gray-700 mb-6">{question.question}</p>

      {question.options ? (
        <div className="space-y-4">
          {Object.entries(question.options).map(([key, value]) => {
            const radioId = `question-${index}-option-${key}`;
            return (
              <div key={key} className="flex items-center space-x-3">
                <input
                  type="radio"
                  id={radioId}
                  name={`question-${index}`}
                  value={key}
                  checked={selectedAnswer === key} // Check if this option is selected
                  onChange={handleInputChange}  // Update the selected answer
                  disabled={submitted}  // Disable radio buttons after submitting
                  className="h-5 w-5 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                />
                <label
                  htmlFor={radioId}
                  className="text-gray-800 text-md cursor-pointer"
                >
                  {key}) {value}
                </label>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="mt-4">
          <textarea
            value={selectedAnswer}
            onChange={handleInputChange}
            disabled={submitted}
            placeholder="Entrez votre réponse ici..."
            className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          ></textarea>
        </div>
      )}

      {submitted && (
        <div className="mt-6 p-4 bg-indigo-50 border border-indigo-300 rounded-md">
          <p className="text-md font-medium text-indigo-800">
            <strong>Réponse correcte:</strong> {question.correct_answer || "Non spécifiée"}
          </p>
          {question.explanation && (
            <p className="text-md text-gray-700 mt-2">
              <strong>Explication:</strong> {question.explanation}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default QuestionCard;