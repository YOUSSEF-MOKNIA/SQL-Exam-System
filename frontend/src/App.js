import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ExamForm from "./components/ExamForm";
import ExamDisplay from "./components/ExamDisplay";
import Sidebar from "./components/Sidebar";
import { fetchExam } from "./api/Exam";

const App = () => {
  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);

  // Load token from localStorage when the app is loaded
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleFormSubmit = async ({
    query,
    questionNbr,
    difficulty,
    questionType,
  }) => {
    setLoading(true);
    try {
      const generatedExam = await fetchExam(
        query,
        questionNbr,
        difficulty,
        questionType
      );
      setExam(generatedExam);
    } catch (error) {
      console.error("Erreur lors de la génération de l'examen:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (jwt) => {
    setToken(jwt);
    localStorage.setItem("token", jwt);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  const resetExam = () => {
    setExam(null); // Resets the exam to null to go back to ExamForm
  };

  return (
    <div className="flex">
      {token ? (
        <>
          {/* Sidebar */}
          <Sidebar onLogout={handleLogout} />

          {/* Main Content */}
          <div
            className={`flex-1 ml-52 h-screen ${
              !exam ? "overflow-hidden" : "overflow-y-scroll"
            } p-6`}
          >
            <Routes>
              <Route
                path="/"
                element={
                  <div className="p-10 space-y-6">
                    {loading ? (
                      <div className="flex flex-col justify-center items-center py-44 space-y-4">
                        <div className="w-24 h-24 border-t-8 border-indigo-600 border-solid rounded-full animate-spin"></div>
                        <span className="text-2xl text-gray-700">
                          Génération des questions en cours...
                        </span>
                      </div>
                    ) : !exam ? (
                      <ExamForm onSubmit={handleFormSubmit} />
                    ) : (
                      <ExamDisplay exam={exam} onReset={resetExam} />
                    )}
                  </div>
                }
              />
              <Route
                path="/history"
                element={<div>Exam History Page (To Be Implemented)</div>}
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </>
      ) : (
        <Routes>
          <Route path="/" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </div>
  );
};

export default App;
