import React, { useState } from "react";
import { BookOpen, Send, Lightbulb } from "lucide-react";

const ExamForm = ({ onSubmit }) => {
  const [query, setQuery] = useState("");
  const [questionNbr, setQuestionNbr] = useState(5);
  const [difficulty, setDifficulty] = useState("intermediate");
  const [questionType, setQuestionType] = useState("mcq");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ query, questionNbr, difficulty, questionType });
  };

  const examplePrompts = [
    { text: "Jointures en SQL", icon: "🔗" },
    { text: "Requêtes SQL", icon: "📝" },
    { text: "Les agrégats", icon: "📊" },
    { text: "Transactions SQL", icon: "💾" },
    { text: "Triggers (déclencheurs)", icon: "⚡" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white p-6 rounded-xl">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="w-12 h-12 text-indigo-600 mr-4" />
            <h1 className="text-5xl font-bold">
              <span className="text-indigo-600">ASK</span>
              <span className="text-yellow-500">.Base</span>
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Générez des examens SQL personnalisés en quelques clics. 
            Choisissez vos préférences et laissez-nous créer le parfait ensemble de questions.
          </p>
        </div>

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Example Prompts Section */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center mb-4">
              <Lightbulb className="w-5 h-5 text-yellow-500 mr-2" />
              <h2 className="text-lg font-semibold text-gray-700">Suggestions de sujets</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {examplePrompts.map(({ text, icon }) => (
                <button
                  key={text}
                  type="button"
                  onClick={() => setQuery(text)}
                  className="flex items-center px-4 py-2 bg-white border-2 border-indigo-100 rounded-full text-indigo-600 hover:bg-indigo-50 hover:border-indigo-200 transition-all duration-200"
                >
                  <span className="mr-2">{icon}</span>
                  {text}
                </button>
              ))}
            </div>
          </div>

          {/* Configuration Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Number of Questions */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre de questions (1-10)
              </label>
              <input
                type="number"
                value={questionNbr}
                onChange={(e) => setQuestionNbr(Number(e.target.value))}
                min="1"
                max="10"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Difficulty */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Difficulté
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              >
                <option value="beginner">Débutant</option>
                <option value="intermediate">Intermédiaire</option>
                <option value="advanced">Avancé</option>
              </select>
            </div>

            {/* Question Type */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type de question
              </label>
              <select
                value={questionType}
                onChange={(e) => setQuestionType(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              >
                <option value="mcq">QCM</option>
                <option value="open-ended">Questions ouvertes</option>
              </select>
            </div>
          </div>

          {/* Query Input */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                required
                placeholder="Entrez votre sujet de SQL ici..."
                className="w-full pl-6 pr-24 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
              >
                <Send className="w-4 h-4 mr-2" />
                Générer
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExamForm;