import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiUser, 
  FiMail, 
  FiLock, 
  FiEye, 
  FiEyeOff, 
  FiArrowRight,
  FiCheckCircle,
  FiCheck 
} from 'react-icons/fi';
import { signup } from '../api/Auth';

const Signup = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    
    if (e.target.name === 'password') {
      setPasswordStrength({
        length: e.target.value.length >= 8,
        uppercase: /[A-Z]/.test(e.target.value),
        lowercase: /[a-z]/.test(e.target.value),
        number: /[0-9]/.test(e.target.value)
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    if (!formData.username || !formData.email || !formData.password) {
      setError('Veuillez remplir tous les champs.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await signup(formData.username, formData.email, formData.password);
      setSuccess(`Inscription réussie ! Bienvenue, ${response.username}.`);
      setFormData({ username: '', email: '', password: '' });
    } catch (err) {
      setError(err.message || 'Erreur lors de l\'inscription.');
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
              <h2 className="text-2xl font-semibold">Commencez gratuitement</h2>
              <div className="space-y-4">
                {[
                  "Création de compte simple et rapide",
                  "Accès à toutes les fonctionnalités",
                  "Support technique disponible"
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
          </div>
          
          <p className="text-sm text-violet-200">
            © 2024 ASK.Base. Tous droits réservés.
          </p>
        </div>

        {/* Right Section: Signup Form */}
        <div className="flex-1 max-w-md mx-auto">
          <div className="bg-white p-8 rounded-3xl shadow-xl shadow-violet-100">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Créer un compte</h2>
              <p className="mt-2 text-gray-600">
                Rejoignez-nous et commencez à créer vos examens personnalisés
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
                    placeholder="Choisissez un nom d'utilisateur"
                    required
                  />
                </div>
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Adresse email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FiMail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors"
                    placeholder="Entrez votre email"
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
                    placeholder="Créez un mot de passe"
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

                {/* Password Strength Indicators */}
                <div className="mt-4 space-y-2">
                  {[
                    { check: passwordStrength.length, text: 'Au moins 8 caractères' },
                    { check: passwordStrength.uppercase, text: 'Une lettre majuscule' },
                    { check: passwordStrength.number, text: 'Un chiffre' }
                  ].map((criteria, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <FiCheckCircle 
                        className={`h-4 w-4 ${
                          criteria.check ? 'text-violet-500' : 'text-gray-300'
                        }`}
                      />
                      <span className={`text-sm ${
                        criteria.check ? 'text-violet-700' : 'text-gray-500'
                      }`}>
                        {criteria.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

             

              {/* Signup Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center px-4 py-3 rounded-xl text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    Créer un compte
                    <FiArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </button>
            </form>

            {/* Login Link */}
            <p className="mt-8 text-center text-gray-600">
              Déjà inscrit ?{' '}
              <Link
                to="/"
                className="font-medium text-violet-600 hover:text-violet-700"
              >
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;