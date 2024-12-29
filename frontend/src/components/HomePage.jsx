import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FiCheck, 
  FiArrowRight, 
  FiBook, 
  FiClock,
  FiSettings,
  FiUsers
} from 'react-icons/fi';

const HomePage = () => {
  const features = [
    {
      icon: <FiBook />,
      title: "Bibliothèque de Questions",
      description: "Accédez à plus de 10,000 questions vérifiées par des experts dans différentes matières."
    },
    {
      icon: <FiClock />,
      title: "Création Rapide",
      description: "Générez des examens complets en quelques minutes grâce à nos modèles personnalisables."
    },
    {
      icon: <FiSettings />,
      title: "Personnalisation Avancée",
      description: "Adaptez chaque aspect de vos examens selon vos besoins spécifiques."
    },
    {
      icon: <FiUsers />,
      title: "Collaboration",
      description: "Partagez et collaborez avec vos collègues sur vos examens."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                ExamGen Pro
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-gray-600 hover:text-violet-600 px-3 py-2 rounded-lg transition-colors"
              >
                Connexion
              </Link>
              <Link
                to="/signup"
                className="bg-violet-600 text-white px-4 py-2 rounded-lg hover:bg-violet-700 transition-colors"
              >
                S'inscrire
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Créez des examens professionnels en quelques clics
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              La solution tout-en-un pour générer, personnaliser et gérer vos examens efficacement.
              Gagnez du temps et assurez la qualité de vos évaluations.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                to="/signup"
                className="flex items-center px-6 py-3 bg-violet-600 text-white rounded-xl hover:bg-violet-700 transition-colors"
              >
                Commencer gratuitement
                <FiArrowRight className="ml-2" />
              </Link>
              <Link
                to="/login"
                className="px-6 py-3 bg-white text-violet-600 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Se connecter
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Tout ce dont vous avez besoin
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Des outils puissants et intuitifs pour créer des examens de qualité professionnelle
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center text-violet-600 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-violet-600 to-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 lg:p-12">
            <div className="max-w-3xl mx-auto text-center text-white">
              <h2 className="text-3xl font-bold mb-6">
                Prêt à transformer votre façon de créer des examens ?
              </h2>
              <p className="text-lg text-white/90 mb-8">
                Rejoignez des milliers d'enseignants qui font confiance à ExamGen Pro.
                Commencez gratuitement dès aujourd'hui !
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  to="/signup"
                  className="px-8 py-3 bg-white text-violet-600 rounded-xl hover:bg-gray-100 transition-colors font-medium"
                >
                  Créer un compte gratuit
                </Link>
                <Link
                  to="/contact"
                  className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-xl hover:bg-white/10 transition-colors font-medium"
                >
                  Nous contacter
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">ExamGen Pro</h3>
              <p className="text-gray-600">
                La solution moderne pour la création d'examens professionnels.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-4">Produit</h4>
              <ul className="space-y-2">
                <li><Link to="/features" className="text-gray-600 hover:text-violet-600">Fonctionnalités</Link></li>
                <li><Link to="/pricing" className="text-gray-600 hover:text-violet-600">Tarifs</Link></li>
                <li><Link to="/templates" className="text-gray-600 hover:text-violet-600">Modèles</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-4">Support</h4>
              <ul className="space-y-2">
                <li><Link to="/help" className="text-gray-600 hover:text-violet-600">Centre d'aide</Link></li>
                <li><Link to="/contact" className="text-gray-600 hover:text-violet-600">Contact</Link></li>
                <li><Link to="/documentation" className="text-gray-600 hover:text-violet-600">Documentation</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-4">Légal</h4>
              <ul className="space-y-2">
                <li><Link to="/terms" className="text-gray-600 hover:text-violet-600">Conditions d'utilisation</Link></li>
                <li><Link to="/privacy" className="text-gray-600 hover:text-violet-600">Politique de confidentialité</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-600">
            <p>© 2024 ExamGen Pro. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;