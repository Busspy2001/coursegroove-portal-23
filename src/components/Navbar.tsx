
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";

// Import components
import ScrollHeader from "./navbar/ScrollHeader";
import NavbarLogo from "./navbar/NavbarLogo";
import DesktopNav from "./navbar/DesktopNav";
import SearchBar from "./navbar/SearchBar";
import UserMenu from "./navbar/UserMenu";
import AuthButtons from "./navbar/AuthButtons";
import MobileMenu from "./navbar/MobileMenu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Navbar = () => {
  const { currentUser, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Check if the current route matches
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <ScrollHeader>
      <nav className="container flex items-center justify-between py-3 px-4 lg:py-1">
        <div className="flex items-center space-x-4 lg:space-x-8">
          <NavbarLogo />

          {/* Desktop Navigation */}
          {!isMobile && <DesktopNav isActive={isActive} />}
        </div>

        {/* Search bar for desktop */}
        <div className="hidden md:flex items-center mx-4 flex-1 max-w-xs">
          <SearchBar />
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <UserMenu 
              currentUser={currentUser} 
              onLogout={handleLogout}
            />
          ) : (
            <AuthButtons />
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden p-2 text-gray-600 dark:text-gray-300 focus:outline-none"
          aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
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
        <MobileMenu
          isAuthenticated={isAuthenticated}
          currentUser={currentUser}
          isActive={isActive}
          onLogout={handleLogout}
          onClose={closeMobileMenu}
        />
      )}
    </ScrollHeader>
  );
};

export default Navbar;
