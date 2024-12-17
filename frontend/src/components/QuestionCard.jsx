import React, { useState, useEffect } from 'react';

const QuestionCard = ({ question, index, onAnswerChange, submitted, userAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(userAnswer || '');
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (question.options) {
      setOptions(
        Object.entries(question.options).map(([key, value]) => ({
          label: key,
          option: value,
        }))
      );
    }
  }, [question]);

  const handleOptionChange = (answer) => {
    setSelectedAnswer(answer);
    onAnswerChange(index, answer);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-4">
      <h3 className="text-xl font-semibold mb-4">Question {index + 1}</h3>
      <p className="text-lg mb-4">{question.question}</p>

      {/* Render options if the question has options */}
      {question.options && options.length > 0 && (
        <div>
          {options.map((opt, i) => (
            <div key={i} className="mb-2">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name={`question-${index}`}
                  value={opt.label}
                  checked={selectedAnswer === opt.label}
                  onChange={() => handleOptionChange(opt.label)}
                  disabled={submitted} // Disable input after submission
                  className="form-radio h-5 w-5 text-blue-500"
                />
                <span className="text-sm">{opt.label}) {opt.option}</span>
              </label>
            </div>
          ))}
        </div>
      )}

      {submitted && (
        <div className="mt-4 bg-gray-100 p-4 rounded-md">
          <p className="text-sm">
            <strong>Réponse correcte:</strong> {question.correct_answer}
          </p>
          <p className="text-sm">
            <strong>Explication:</strong> {question.explanation}
          </p>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
