import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiUser, 
  FiLock,
  FiEye, 
  FiEyeOff,
  FiArrowRight,
  FiCheck
} from 'react-icons/fi';
import { login } from '../api/Auth';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    if (!formData.username || !formData.password) {
      setError('Veuillez remplir tous les champs.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await login(formData.username, formData.password);
      setSuccess('Connexion réussie !');
      onLogin(response.access_token);
    } catch (err) {
      setError(err.message || 'Erreur de connexion.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (success) setSuccess('');
      if (error) setError('');
    }, 5000);
    return () => clearTimeout(timer);
  }, [success, error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br">
      <div className="w-full max-w-7xl mx-4 flex gap-8">
        {/* Left Section: Branding & Info */}
        <div className="hidden lg:flex flex-1 flex-col justify-between p-12 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-3xl text-white">
          <div>
          <div className="flex flex-row gap-x-3 items-center">
            <img src="syslogo.svg" className="w-16 h-16" alt="Logo" />
            <h1 className="text-3xl font-bold">ASK<span className="text-yellow-400">.Base</span></h1>
          </div>
            <p className="mt-2 text-violet-200">Votre assistant de génération d'examens</p>
          </div>
          
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Simplifiez votre travail</h2>
              <div className="space-y-4">
                {[
                  "Génération rapide d'examens personnalisés",
                  "Base de données de questions enrichie",
                  "Interface intuitive et moderne"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-violet-500/20">
                      <FiCheck className="w-4 h-4" />
                    </div>
                    <span className="text-violet-100">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* <img
              src="login.svg"
              alt="Login illustration"
              className="w-4/5 max-w-md mx-auto"
            /> */}
          </div>
          
          <p className="text-sm text-violet-200">
            © 2024 ASK.Base. Tous droits réservés.
          </p>
        </div>

        {/* Right Section: Login Form */}
        <div className="flex-1 max-w-md mx-auto">
          <div className="bg-white p-8 rounded-3xl shadow-xl shadow-violet-100">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Connexion</h2>
              <p className="mt-2 text-gray-600">
                Bienvenue ! Veuillez vous connecter pour continuer.
              </p>
            </div>

            {/* Alert Messages */}
            {(success || error) && (
              <div
                className={`mb-6 p-4 rounded-xl ${
                  success
                    ? 'bg-green-50 text-green-700 border border-green-100'
                    : 'bg-red-50 text-red-700 border border-red-100'
                } transition-all duration-300`}
              >
                <p className="text-sm">{success || error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom d'utilisateur
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FiUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors"
                    placeholder="Entrez votre nom d'utilisateur"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mot de passe
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FiLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-11 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors"
                    placeholder="Entrez votre mot de passe"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center"
                  >
                    {showPassword ? (
                      <FiEyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <FiEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-violet-600 border-gray-300 rounded focus:ring-violet-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">Se souvenir de moi</span>
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-violet-600 hover:text-violet-700 font-medium"
                >
                  Mot de passe oublié ?
                </Link>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center px-4 py-3 rounded-xl text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    Se connecter
                    <FiArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </button>
            </form>

            {/* Sign Up Link */}
            <p className="mt-8 text-center text-gray-600">
              Vous n'avez pas de compte ?{' '}
              <Link
                to="/signup"
                className="font-medium text-violet-600 hover:text-violet-700"
              >
                Créer un compte
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;