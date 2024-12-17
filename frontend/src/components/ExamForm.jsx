import React, { useState } from "react";

const ExamForm = ({ onSubmit }) => {
  const [query, setQuery] = useState("");
  const [questionNbr, setQuestionNbr] = useState(5);
  const [difficulty, setDifficulty] = useState("intermediate");
  const [questionType, setQuestionType] = useState("mcq");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ query, questionNbr, difficulty, questionType });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-5xl font-bold text-indigo-600">Bienvenue sur ASK<span className="text-[#F9C650]">.Base</span></h1>
        <p className="mt-2 text-lg text-gray-600">
          Configurez vos préférences et générez des examens basés sur SQL en un clic.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full px-6 flex flex-col space-y-6 mt-8 max-w-3xl mx-auto"
      >
        {/* Example Prompts */}
        <div className="flex flex-wrap justify-center space-x-6 mb-2 text-sm text-gray-500 ">
          <button
            type="button"
            onClick={() => setQuery("Le jointures en SQL")}
            className="px-4 py-2 bg-[#A6C6ED] bg-opacity-50 hover:bg-opacity-80 focus:outline-none rounded-full"
          >
            Le jointures en SQL
          </button>
          <button
            type="button"
            onClick={() => setQuery("Les requêtes SQL")}
            className="px-4 py-2 bg-[#A6C6ED] bg-opacity-50 hover:bg-opacity-80 focus:outline-none rounded-full"
          >
           Les requêtes SQL
          </button>
          <button
            type="button"
            onClick={() => setQuery("Les types de donnee en SQL")}
            className="px-4 py-2 bg-[#A6C6ED] bg-opacity-50 hover:bg-opacity-80 focus:outline-none rounded-full"
          >
            Les types de donnee en SQL
          </button>
          <button
            type="button"
            onClick={() => setQuery("TransactSQL")}
            className="px-4 py-2 bg-[#A6C6ED] bg-opacity-50 hover:bg-opacity-80 rounded-full focus:outline-none"
          >
            TransactSQL
          </button>
        </div>

        {/* Inputs Row */}
        <div className="flex flex-wrap justify-between items-center space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="flex-1 min-w-[150px]">
            <label htmlFor="questionNbr" className="block text-sm font-medium text-gray-700">
              Nombre de questions
            </label>
            <input
              type="number"
              id="questionNbr"
              value={questionNbr}
              onChange={(e) => setQuestionNbr(Number(e.target.value))}
              min="1"
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex-1 min-w-[150px]">
            <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700">
              Difficulté
            </label>
            <select
              id="difficulty"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="beginner">Débutant</option>
              <option value="intermediate">Intermédiaire</option>
              <option value="advanced">Avancé</option>
            </select>
          </div>
          <div className="flex-1 min-w-[150px]">
            <label htmlFor="questionType" className="block text-sm font-medium text-gray-700">
              Type de question
            </label>
            <select
              id="questionType"
              value={questionType}
              onChange={(e) => setQuestionType(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="mcq">QCM</option>
              <option value="open-ended">Questions ouvertes</option>
            </select>
          </div>
        </div>

        {/* Chat Input */}
        <div className="mt-4 relative">
          <label htmlFor="query" className="sr-only">
            Requête SQL
          </label>
          <input
            type="text"
            id="query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            required
            placeholder="Entrez votre requête SQL ici..."
            className="p-4 w-full border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 py-2 px-4 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Envoyer
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExamForm;
