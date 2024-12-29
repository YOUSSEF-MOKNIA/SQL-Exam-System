import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ExamForm from "./components/ExamForm";
import ExamDisplay from "./components/ExamDisplay";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import ExamHistory from "./components/ExamHistory";
import { fetchExam } from "./api/Exam";

const App = () => {
  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState({
    username: "User",
    email: "user@example.com",
  });
  const navigate = useNavigate();

  // Load token from localStorage when the app is loaded
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleFormSubmit = async ({ query, questionNbr, difficulty, questionType }) => {
    setLoading(true);
    try {
      const generatedExam = await fetchExam(query, questionNbr, difficulty, questionType);
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

  const handleExamClick = (exam) => {
    setExam(exam); // Set the clicked exam to be displayed in the ExamDisplay
    navigate("/exam-display"); // Navigate to the ExamDisplay page
  };

  const resetExam = () => {
    setExam(null); // Resets the exam to null to go back to ExamForm
    navigate("/"); // Navigate back to the ExamForm page
  };

  return (
    <div className="flex min-h-screen overflow-y-auto"> {/* Apply overflow-y-auto here */}
      {token ? (
        <>
          {/* Sidebar */}
          <Sidebar onExamClick={handleExamClick} onLogout={handleLogout} />

          {/* Main Content */}
          <div className={`flex-1 ml-64 ${!exam ? "overflow-hidden" : "overflow-y-scroll"}`}>
            {/* TopBar */}
            {/* <TopBar username={user.username} email={user.email} onLogout={handleLogout} /> */}

            <Routes>
              <Route path="/" element={
                <div className="p-10 space-y-6">
                  {loading ? (
                     <div className="flex flex-col items-center justify-center min-h-[600px] bg-gradient-to-b from-white to-gray-50">
                     <div className="relative">
                       {/* Outer ring */}
                       <div className="w-24 h-24 border-8 border-indigo-200 rounded-full animate-spin"></div>
                       {/* Inner ring */}
                       <div className="absolute top-0 left-0 w-24 h-24 border-8 border-indigo-600 rounded-full animate-spin border-t-transparent"></div>
                     </div>
                     
                     {/* Loading text with shimmer effect */}
                     <div className="mt-8 space-y-2 text-center">
                       <h2 className="text-2xl font-semibold text-gray-800">
                         Génération en cours
                       </h2>
                       <div className="flex items-center justify-center space-x-1">
                         <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"></div>
                         <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                         <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                       </div>
                       <p className="text-gray-500 mt-2">
                         Préparation de vos questions d'examen
                       </p>
                     </div>
                   </div>
                  ) : !exam ? (
                    <ExamForm onSubmit={handleFormSubmit} />
                  ) : (
                    <ExamDisplay exam={exam} onReset={resetExam} />
                  )}

                </div>
              } />
              <Route path="/exam-history" element={<ExamHistory onExamClick={handleExamClick} />} />
              <Route path="/exam-display" element={<ExamDisplay exam={exam} onReset={resetExam} />} /> {/* Exam display route */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center w-full h-full">
          <Routes>
            <Route path="/" element={<Login onLogin={handleLogin} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      )}
    </div>
  );
};

export default App;