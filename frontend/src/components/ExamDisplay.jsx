import React, { useState, useEffect } from "react";
import { ArrowLeft, RotateCcw, CheckCircle, AlertCircle, Trophy } from "lucide-react";
import QuestionCard from "./QuestionCard";

const ExamDisplay = ({ exam, onReset }) => {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [parsedQuestions, setParsedQuestions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (exam && exam.questions) {
      const questions = exam.questions.map((q, index) => {
        let cleanedData = q.question_data;

        if (!cleanedData) {
          console.error(`No question_data for Question ${index + 1}`);
          return { ...q, error: "Missing question data." };
        }

        cleanedData = cleanedData.replace(/^[^\{]*\{([\s\S]*)\}[^\}]*$/, "$1");
        cleanedData = cleanedData.replace(/[\u0000-\u001F\u007F-\u009F]/g, "");
        cleanedData = cleanedData.replace(/\\"/g, '"');
        cleanedData = cleanedData.replace(/`/g, '"');
        console.log(cleanedData);

        try {
          const questionData = JSON.parse(`{${cleanedData}}`);
          console.log(questionData);
          return { ...q, ...questionData };
        } catch (error) {
          console.error(`Error parsing JSON for Question ${index + 1}:`, error);
          return { ...q, error: "Le format de données de question non valide. Impossible d'analyser." };
        }
      });

      setParsedQuestions(questions);
    }
  }, [exam]);

  const handleAnswerChange = (questionIndex, answer) => {
    setAnswers(prev => ({ ...prev, [questionIndex]: answer }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setShowModal(true);
  };

  const handleReinitialize = () => {
    setAnswers({});
    setSubmitted(false);
    setShowModal(false);
    setTimeSpent(0);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const correctAnswers = parsedQuestions.filter(
    (q, index) => answers[index] === q.correct_answer
  ).length;

  const totalQuestions = parsedQuestions.length;
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);
  const answeredQuestions = Object.keys(answers).length;

  const isMCQExam = parsedQuestions.every((q) => q.type === "mcq");

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white p-6 rounded-xl">
      <div className=" mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
          <div className="flex items-center justify-between">
            <button 
              onClick={onReset}
              className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Retour</span>
            </button>
            <div className="flex items-center space-x-4">
              {/* <div className="px-4 py-2 bg-indigo-50 rounded-lg">
                <span className="text-indigo-600 font-medium">
                  Temps: {formatTime(timeSpent)}
                </span>
              </div> */}
              <button
                onClick={handleReinitialize}
                className="flex items-center space-x-2 px-4 py-2 bg-indigo-100 text-indigo-600 rounded-lg hover:bg-indigo-200 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Réinitialiser</span>
              </button>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">
              Examen SQL
            </h1>
            <div className="flex space-x-4">
              <div className="flex items-center bg-green-50 px-4 py-2 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                <span className="text-green-600">
                  {answeredQuestions}/{totalQuestions} Répondu
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-6">
          {parsedQuestions.map((question, index) => {
            if (question.error) {
              return (
                <div key={index} className="bg-red-50 p-6 rounded-xl border border-red-100">
                  <div className="flex items-center space-x-3">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    <p className="text-red-600 font-medium">{question.error}</p>
                  </div>
                </div>
              );
            }

            return (
              <QuestionCard
                key={index}
                question={question}
                index={index}
                onAnswerChange={handleAnswerChange}
                submitted={submitted}
                userAnswer={answers[index]}
                resetSelectedAnswer={handleReinitialize}
              />
            );
          })}
        </div>

        {/* Submit Button */}
        {!submitted && (
          <div className="sticky bottom-6 mt-8">
            <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100">
              <div className="flex items-center justify-between">
                <div className="text-gray-600">
                  {answeredQuestions}/{totalQuestions} questions répondues
                </div>
                <button
                  onClick={handleSubmit}
                  disabled={answeredQuestions < totalQuestions}
                  className={`px-8 py-3 rounded-lg flex items-center space-x-2 ${
                    answeredQuestions < totalQuestions 
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  } transition-colors`}
                >
                  <Trophy className="w-5 h-5" />
                  <span>Soumettre l'examen</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Results Modal */}
        {showModal && isMCQExam && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div 
              className="bg-white rounded-2xl p-8 max-w-xl w-full mx-4 transform transition-all"
              onClick={e => e.stopPropagation()}
            >
              <div className="text-center">
                <div className={`inline-flex p-4 rounded-full mb-4 ${
                  percentage >= 80 ? 'bg-green-100' :
                  percentage >= 50 ? 'bg-yellow-100' : 'bg-red-100'
                }`}>
                  <Trophy className={`w-8 h-8 ${
                    percentage >= 80 ? 'text-green-500' :
                    percentage >= 50 ? 'text-yellow-500' : 'text-red-500'
                  }`} />
                </div>
                
                <h2 className="text-3xl font-bold mb-2">
                  {percentage >= 80 ? 'Félicitations ! 🎉' :
                   percentage >= 50 ? 'Bon travail ! 👍' : 'Continuez vos efforts ! 💪'}
                </h2>
                
                <div className="flex justify-center items-center space-x-4 my-6">
                  <div className="text-5xl font-bold text-indigo-600">
                    {percentage}%
                  </div>
                  <div className="text-left text-gray-600">
                    {/* <div>Temps: {formatTime(timeSpent)}</div> */}
                    <div>{correctAnswers}/{totalQuestions} correctes</div>
                  </div>
                </div>

                <div className="flex justify-center space-x-4 mt-8">
                  <button
                    onClick={handleReinitialize}
                    className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Réessayer
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Revoir les réponses
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamDisplay;