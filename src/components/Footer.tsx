
import React from "react";
import { Link } from "react-router-dom";
import { Book, Facebook, Twitter, Instagram, Youtube, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-schoolier-dark border-t">
      <div className="container px-6 py-12 mx-auto">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <div className="flex items-center space-x-2">
              <Book className="h-6 w-6 text-schoolier-teal" />
              <span className="text-xl font-bold text-schoolier-blue">Schoolier</span>
            </div>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
              Une plateforme e-learning innovante pour apprendre à votre rythme
              avec des cours de qualité dispensés par des experts.
            </p>
            <div className="flex mt-6 space-x-4">
              <Facebook className="h-5 w-5 text-schoolier-gray hover:text-schoolier-blue cursor-pointer" />
              <Twitter className="h-5 w-5 text-schoolier-gray hover:text-schoolier-blue cursor-pointer" />
              <Instagram className="h-5 w-5 text-schoolier-gray hover:text-schoolier-blue cursor-pointer" />
              <Youtube className="h-5 w-5 text-schoolier-gray hover:text-schoolier-blue cursor-pointer" />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-800 dark:text-white">Liens rapides</h3>
            <div className="flex flex-col mt-4 space-y-2">
              <Link to="/courses" className="text-gray-600 dark:text-gray-300 hover:text-schoolier-blue dark:hover:text-white">
                Tous les cours
              </Link>
              <Link to="/about" className="text-gray-600 dark:text-gray-300 hover:text-schoolier-blue dark:hover:text-white">
                À propos
              </Link>
              <Link to="/contact" className="text-gray-600 dark:text-gray-300 hover:text-schoolier-blue dark:hover:text-white">
                Contact
              </Link>
              <Link to="/blog" className="text-gray-600 dark:text-gray-300 hover:text-schoolier-blue dark:hover:text-white">
                Blog
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-800 dark:text-white">Ressources</h3>
            <div className="flex flex-col mt-4 space-y-2">
              <Link to="/faq" className="text-gray-600 dark:text-gray-300 hover:text-schoolier-blue dark:hover:text-white">
                FAQ
              </Link>
              <Link to="/help" className="text-gray-600 dark:text-gray-300 hover:text-schoolier-blue dark:hover:text-white">
                Centre d'aide
              </Link>
              <Link to="/become-instructor" className="text-gray-600 dark:text-gray-300 hover:text-schoolier-blue dark:hover:text-white">
                Devenir instructeur
              </Link>
              <Link to="/affiliates" className="text-gray-600 dark:text-gray-300 hover:text-schoolier-blue dark:hover:text-white">
                Programme d'affiliation
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-800 dark:text-white">Contact</h3>
            <div className="flex flex-col mt-4 space-y-2">
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-schoolier-teal" />
                <span className="text-gray-600 dark:text-gray-300">contact@schoolier.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-schoolier-teal" />
                <span className="text-gray-600 dark:text-gray-300">+33 (0)1 23 45 67 89</span>
              </div>
            </div>
          </div>
        </div>

        <hr className="my-8 border-gray-200 dark:border-gray-700" />

        <div className="flex flex-col items-center sm:flex-row sm:justify-between">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            © {new Date().getFullYear()} Schoolier. Tous droits réservés.
          </p>
          <div className="flex mt-4 space-x-4 sm:mt-0">
            <Link to="/terms" className="text-sm text-gray-600 dark:text-gray-300 hover:text-schoolier-blue dark:hover:text-white">
              Conditions d'utilisation
            </Link>
            <Link to="/privacy" className="text-sm text-gray-600 dark:text-gray-300 hover:text-schoolier-blue dark:hover:text-white">
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
