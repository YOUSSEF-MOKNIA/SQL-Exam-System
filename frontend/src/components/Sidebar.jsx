import React, { useState, useEffect } from "react";
import { fetchExamHistory } from "../api/Exam";

const Sidebar = ({ onLogout }) => {
  const [examHistory, setExamHistory] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const loadExamHistory = async () => {
      try {
        const history = await fetchExamHistory();
        // Sort history by date (latest to oldest)
        const sortedHistory = history.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setExamHistory(sortedHistory);
      } catch (error) {
        console.error("Error loading exam history:", error);
      }
    };

    loadExamHistory();
  }, []);

  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    onLogout();
  };

  const handleDelete = (id) => {
    // Handle deletion logic here
    console.log(`Delete item with id: ${id}`);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="w-64 h-screen fixed bg-[#4C6E9B] text-white flex flex-col">
      {/* Logo and System Name */}
      <div className="flex items-center justify-center py-6 border-b border-[#FFFFFF33]">
        <img src="syslogo.svg" alt="System Logo" className="w-14 h-14 mr-3" />
        <span className="text-2xl font-bold">
          ASK<span className="text-[#F9C650]">.Base</span>
        </span>
      </div>

      {/* Exam History */}
      <div className="flex-1 px-4 py-6 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Historique</h3>
        </div>
        <ul className="space-y-2">
          {examHistory.slice(0, 4).map((exam, index) => (
            <li
              key={index}
              className="flex items-center justify-between bg-[#375A7F] rounded-lg p-3 shadow-md hover:bg-[#F9C650] hover:text-black transition"
            >
              <div className="flex-1">
                <p className="text-sm font-bold truncate">{exam.query}</p>
                <p className="text-xs text-[#E2E8F0] mt-1">
                  {new Date(exam.created_at).toLocaleDateString()}
                </p>
              </div>
              <img
                src="/bi_trash-fill.svg"
                alt="Delete Icon"
                className="cursor-pointer w-4 h-4 hover:text-red-400"
                onClick={() => handleDelete(exam._id)}
              />
            </li>
          ))}
        </ul>

        {/* More Button */}
        {examHistory.length > 2 && (
          <button
            className="mt-4 w-full py-2 bg-[#F9C650] text-black rounded-md hover:bg-[#E2B7D2] transition"
            onClick={toggleModal}
          >
            Voir tout
          </button>
        )}
      </div>

      {/* User Profile and Logout */}
      <div className="px-4 py-6 mt-auto border-t border-[#FFFFFF33]">
        <button
          onClick={handleLogoutClick}
          className="w-full flex items-center justify-start py-2 text-sm text-white hover:bg-[#E2B7D2] rounded-md"
        >
          <img
            src="/solar_logout-2-bold.svg"
            alt="Logout Icon"
            className="mr-3 w-8 h-8"
          />
          <p className="text-sm font-bold text-white">Déconnecter</p>
        </button>
      </div>

      {/* Footer */}
      <div className="px-4 py-4 text-center">
        <p className="text-xs text-[#E2E8F0]">&copy; 2024 ASK.Base</p>
      </div>

      {/* Modal for Full History */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <h3 className="text-xl font-bold text-black mb-4">Historique Complet</h3>
            <ul className="space-y-3 overflow-y-auto max-h-64">
              {examHistory.map((exam, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between bg-gray-200 rounded-lg p-3"
                >
                  <div className="flex-1">
                    <p className="text-sm font-bold truncate text-black">
                      {exam.query}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      {new Date(exam.created_at).toLocaleDateString()} -{" "}
                      {new Date(exam.created_at).toLocaleTimeString()}
                    </p>
                  </div>
                  <img
                    src="/bi_trash-fill.svg"
                    alt="Delete Icon"
                    className="cursor-pointer w-4 h-4 hover:text-red-400"
                    onClick={() => handleDelete(exam._id)}
                  />
                </li>
              ))}
            </ul>
            <button
              onClick={toggleModal}
              className="mt-4 w-full py-2 bg-[#375A7F] text-white rounded-md hover:bg-[#4C6E9B] transition"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
