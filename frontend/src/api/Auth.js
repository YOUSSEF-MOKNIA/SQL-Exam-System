import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000'; 

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, { username, password });
    return response.data; // JWT token
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.detail || 'An error occurred during login.');
    }
    throw new Error('Unable to connect to the server.');
  }
};

export const signup = async (username, email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/signup`, {  // Update URL here
        username,
        email,
        password,
      });
      return response.data; // User data
    } catch (error) {
      if (error.response && error.response.data) {
        throw new Error(error.response.data.detail || 'An error occurred during signup.');
      }
      throw new Error('Unable to connect to the server.');
    }
  };
  
