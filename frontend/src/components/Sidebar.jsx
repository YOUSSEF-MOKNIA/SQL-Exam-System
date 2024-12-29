import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { History, LogOut, Trash2, ChevronRight, Search, Book, Plus } from "lucide-react";
import { fetchExamHistory, deleteExam } from "../api/Exam";

const Sidebar = ({ onExamClick, onLogout, userProfile }) => {
  const [examHistory, setExamHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loadExamHistory = async () => {
      try {
        const history = await fetchExamHistory();
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

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      await deleteExam(id);
      setExamHistory(prevHistory => prevHistory.filter(exam => exam._id !== id));
    } catch (error) {
      console.error("Error deleting exam:", error);
    }
  };

  const filteredHistory = examHistory.filter(exam =>
    exam.query.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="w-64 h-screen fixed bg-gradient-to-b from-indigo-950 to-indigo-900 text-white flex flex-col">
      {/* Logo Section */}
      <div className="p-6">
        <div className="flex items-center justify-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl shadow-lg">
            <Book className="w-6 h-6 text-indigo-950" />
          </div>
          <span className="text-2xl font-bold">
            ASK<span className="text-yellow-400">.Base</span>
          </span>
        </div>
      </div>


      {/* Search Section */}
      <div className="px-4 mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-300" />
          <input
            type="text"
            placeholder="Rechercher un examen..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/10 rounded-xl pl-10 pr-4 py-3 text-sm placeholder-indigo-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none border border-indigo-800/50"
          />
        </div>
      </div>

      {/* History Section */}
      <div className="flex-1 px-4 overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-700 scrollbar-track-transparent">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-2">
            <History className="w-4 h-4 text-indigo-300" />
            <h3 className="font-medium">Historique</h3>
          </div>
          {examHistory.length > 0 && (
            <Link
              to="/exam-history"
              className="flex items-center text-xs text-indigo-300 hover:text-yellow-400 transition-colors"
            >
              Voir tout
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          )}
        </div>

        {filteredHistory.length === 0 ? (
          <div className="text-center py-6">
            <div className="bg-indigo-800/30 backdrop-blur-sm rounded-xl p-6 border border-indigo-800/50">
              <History className="w-12 h-12 text-indigo-400 mx-auto mb-3" />
              <p className="text-indigo-300 text-sm">
                {searchTerm ? "Aucun examen trouvé" : "Pas encore d'examens"}
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredHistory.slice(0, 4).map((exam, index) => (
              <div
                key={index}
                onClick={() => onExamClick(exam)}
                className="h-16 group relative bg-indigo-800/20 hover:bg-indigo-800/30 rounded-xl p-2 cursor-pointer transition-all duration-200 border border-indigo-800/50 backdrop-blur-sm"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate group-hover:text-yellow-400 transition-colors">
                      {exam.query}
                    </h4>
                    <p className="text-xs text-indigo-300 mt-1">
                      {formatDate(exam.created_at)}
                    </p>
                  </div>
                  <button
                    onClick={(e) => handleDelete(e, exam._id)}
                    className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-red-500/20 rounded-lg transition-all ml-2"
                  >
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* User Profile Section */}
      <div className="p-4 border-t border-indigo-800/50">
        <div className="bg-indigo-800/20 rounded-xl p-4 backdrop-blur-sm border border-indigo-800/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-lg font-bold">
                {userProfile?.name?.charAt(0) || "U"}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">
                {userProfile?.name || "Utilisateur"}
              </p>
              <p className="text-xs text-indigo-300 truncate">
                {userProfile?.email || "Email non disponible"}
              </p>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="mt-4 w-full flex items-center justify-center space-x-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg py-2.5 transition-colors border border-red-500/20"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm font-medium">Déconnecter</span>
          </button>
        </div>

        <div className="mt-4 text-center text-xs text-indigo-300">
          &copy; 2024 ASK.Base
        </div>
      </div>
    </div>
  );
};

export default Sidebar;