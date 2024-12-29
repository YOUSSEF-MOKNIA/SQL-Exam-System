import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000"; // Replace with your backend URL

export const fetchExam = async (
  query,
  questionNbr,
  difficulty,
  questionType,
  cancelToken
) => {
  try {
    const token = localStorage.getItem("token"); // Retrieve the token
    const response = await axios.post(
      `${API_BASE_URL}/Exam/generate-exam`,
      {
        query,
        question_nbr: questionNbr,
        difficulty,
        question_type: questionType,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in Authorization header
        },
        cancelToken,
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log("Request canceled");
    } else {
      console.error("Error fetching the exam:", error);
      throw error;
    }
  }
};


export const fetchExamHistory = async () => {
  try {
    const token = localStorage.getItem("token"); // Retrieve the token
    const response = await axios.get(`${API_BASE_URL}/Exam/exam_history`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include token in Authorization header
      },
    });
    console.log(response.data);
    return response.data.exams; // Return the exam history
  } catch (error) {
    console.error("Error fetching the exam history:", error);
    throw error;
  }
};

export const deleteExam = async (id) => {
  try {
    const token = localStorage.getItem("token");
    await axios.delete(`${API_BASE_URL}/Exam/delete-exam/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Error deleting exam:", error);
    throw error;
  }
};
