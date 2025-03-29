
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Menu, X, Book, User, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { currentUser, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navigationLinks = [
    { name: "Accueil", path: "/" },
    { name: "Cours", path: "/courses" },
    { name: "À propos", path: "/about" },
  ];

  return (
    <header className="bg-white dark:bg-schoolier-dark border-b">
      <nav className="container flex items-center justify-between p-4">
        <div className="flex items-center space-x-8">
          <Link to="/" className="flex items-center space-x-2">
            <Book className="h-8 w-8 text-schoolier-teal" />
            <span className="text-xl font-bold text-schoolier-blue">Schoolier</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            {navigationLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-gray-600 hover:text-schoolier-blue dark:text-gray-300 dark:hover:text-white"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <img
                    src={currentUser?.avatar || "https://ui-avatars.com/api/?name=User&background=0D9488&color=fff"}
                    alt="User"
                    className="h-8 w-8 rounded-full"
                  />
                  <span>{currentUser?.name}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                  Tableau de bord
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  Mon profil
                </DropdownMenuItem>
                {currentUser?.role === "instructor" && (
                  <DropdownMenuItem onClick={() => navigate("/instructor")}>
                    Espace instructeur
                  </DropdownMenuItem>
                )}
                {currentUser?.role === "admin" && (
                  <DropdownMenuItem onClick={() => navigate("/admin")}>
                    Administration
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  Déconnexion
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" onClick={() => navigate("/login")}>
                Connexion
              </Button>
              <Button onClick={() => navigate("/register")}>
                Inscription
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden text-gray-600 dark:text-gray-300"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-schoolier-dark p-4 shadow-md">
          <div className="flex flex-col space-y-4">
            {navigationLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-gray-600 hover:text-schoolier-blue dark:text-gray-300 dark:hover:text-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-gray-600 hover:text-schoolier-blue dark:text-gray-300 dark:hover:text-white"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Tableau de bord
                </Link>
                <Link
                  to="/profile"
                  className="text-gray-600 hover:text-schoolier-blue dark:text-gray-300 dark:hover:text-white"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Mon profil
                </Link>
                <Button variant="destructive" onClick={handleLogout}>
                  Déconnexion
                </Button>
              </>
            ) : (
              <div className="flex flex-col space-y-2">
                <Button onClick={() => { navigate("/login"); setIsMobileMenuOpen(false); }}>
                  Connexion
                </Button>
                <Button variant="outline" onClick={() => { navigate("/register"); setIsMobileMenuOpen(false); }}>
                  Inscription
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
