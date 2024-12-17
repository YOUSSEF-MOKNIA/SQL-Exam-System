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
    const response = await axios.post(
      `${API_BASE_URL}/Exam/generate-exam`,
      {
        query,
        question_nbr: questionNbr,
        difficulty,
        question_type: questionType,
      },
      { cancelToken }
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
