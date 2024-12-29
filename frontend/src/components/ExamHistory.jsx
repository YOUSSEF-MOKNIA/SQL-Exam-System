import React, { useState, useEffect } from "react";
import { fetchExamHistory, deleteExam } from "../api/Exam";
import { Link } from "react-router-dom";
import { Trash2, ArrowLeft, Clock, AlertCircle } from "lucide-react";

const ExamHistory = ({ onExamClick }) => {
  const [examHistory, setExamHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

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
      } finally {
        setLoading(false);
      }
    };

    loadExamHistory();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteExam(id);
      setExamHistory((prevHistory) =>
        prevHistory.filter((exam) => exam._id !== id)
      );
    } catch (error) {
      console.error("Error deleting exam:", error);
    }
  };

  const handleDeleteAll = async () => {
    try {
      for (const exam of examHistory) {
        await deleteExam(exam._id);
      }
      setExamHistory([]);
      setShowDeleteConfirm(false);
    } catch (error) {
      console.error("Error deleting all exams:", error);
    }
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className=" mx-auto p-6">
        {/* Header Section */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-indigo-600 hover:text-indigo-800 transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span className="text-lg font-medium">Retour</span>
          </Link>
          
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Historique des Examens
            </h1>
            {examHistory.length > 0 && (
              <div className="relative">
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="inline-flex items-center px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">Supprimer Tous</span>
                </button>

                {/* Delete Confirmation Modal */}
                {showDeleteConfirm && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md mx-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Confirmer la suppression
                      </h3>
                      <p className="text-gray-600 mb-6">
                        Êtes-vous sûr de vouloir supprimer tous les examens ? Cette action est irréversible.
                      </p>
                      <div className="flex justify-end space-x-3">
                        <button
                          onClick={() => setShowDeleteConfirm(false)}
                          className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                        >
                          Annuler
                        </button>
                        <button
                          onClick={handleDeleteAll}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                          Confirmer
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        )}

        {/* Empty State */}
        {!loading && examHistory.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg font-medium">
              Il n'y a pas encore d'examens
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Les examens que vous créez apparaîtront ici
            </p>
          </div>
        )}

        {/* Exam List */}
        {!loading && examHistory.length > 0 && (
          <div className="grid gap-4">
            {examHistory.map((exam) => (
              <div
                key={exam._id}
                className="bg-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 group"
              >
                <button
                  className="w-full text-left p-4"
                  onClick={() => onExamClick(exam)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 group-hover:text-indigo-600 transition-colors">
                        {truncateText(exam.query, 50)}
                      </h3>
                      <div className="flex items-center mt-2 text-sm text-gray-500">
                        <Clock className="w-4 h-4 mr-2" />
                        <time dateTime={exam.created_at}>
                          {new Date(exam.created_at).toLocaleDateString()} à{" "}
                          {new Date(exam.created_at).toLocaleTimeString()}
                        </time>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(exam._id);
                      }}
                      className="ml-4 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamHistory;