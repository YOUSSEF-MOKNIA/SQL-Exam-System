import React, { useState } from 'react';
import { login } from '../api/Auth';
import { Link } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous error
    try {
      const response = await login(formData.username, formData.password);
      onLogin(response.access_token);
    } catch (err) {
      setError(err.message); // Display backend error
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="w-full p-3 border rounded-md"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-3 border rounded-md"
        />
        <button
          type="submit"
          className="w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Login
        </button>
      </form>
      {error && <p className="mt-4 text-center text-red-600">{error}</p>}
      <p className="mt-4 text-center">
        Don't have an account?{' '}
        <Link to="/signup" className="text-indigo-600 hover:underline">
          Signup
        </Link>
      </p>
    </div>
  );
};

export default Login;
