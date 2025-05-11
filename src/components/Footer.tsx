
import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-schoolier-dark border-t">
      <div className="container px-6 py-12 mx-auto">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <div className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/15fccc6e-df41-4aa0-9708-c5ef28cab8cd.png" 
                alt="Schoolier Logo" 
                className="h-24 w-auto"
              />
            </div>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
              Une plateforme e-learning innovante pour apprendre à votre rythme
              avec des cours de qualité dispensés par des experts.
            </p>
            <div className="flex mt-6 space-x-4">
              <a href="https://facebook.com/schoolier" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Facebook className="h-5 w-5 text-schoolier-gray hover:text-schoolier-blue cursor-pointer" />
              </a>
              <a href="https://twitter.com/schoolier" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter className="h-5 w-5 text-schoolier-gray hover:text-schoolier-blue cursor-pointer" />
              </a>
              <a href="https://instagram.com/schoolier" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram className="h-5 w-5 text-schoolier-gray hover:text-schoolier-blue cursor-pointer" />
              </a>
              <a href="https://youtube.com/schoolier" target="_blank" rel="noopener noreferrer" aria-label="Youtube">
                <Youtube className="h-5 w-5 text-schoolier-gray hover:text-schoolier-blue cursor-pointer" />
              </a>
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
              <Link to="/teach" className="text-gray-600 dark:text-gray-300 hover:text-schoolier-blue dark:hover:text-white">
                Devenir instructeur
              </Link>
              <Link to="/business" className="text-gray-600 dark:text-gray-300 hover:text-schoolier-blue dark:hover:text-white">
                Pour les entreprises
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-800 dark:text-white">Contact</h3>
            <div className="flex flex-col mt-4 space-y-2">
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-schoolier-teal" />
                <a href="mailto:contact@schoolier.com" className="text-gray-600 dark:text-gray-300 hover:text-schoolier-blue">contact@schoolier.com</a>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-schoolier-teal" />
                <a href="tel:+33123456789" className="text-gray-600 dark:text-gray-300 hover:text-schoolier-blue">+33 (0)1 23 45 67 89</a>
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
