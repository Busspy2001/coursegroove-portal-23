
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Bell, Search, Globe } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

// Import components
import ScrollHeader from "./navbar/ScrollHeader";
import NavbarLogo from "./navbar/NavbarLogo";
import DesktopNav from "./navbar/DesktopNav";
import SearchBar from "./navbar/SearchBar";
import UserMenu from "./navbar/UserMenu";
import AuthButtons from "./navbar/AuthButtons";
import MobileMenu from "./navbar/MobileMenu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const Navbar = () => {
  const { currentUser, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

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

  const toggleSearch = () => {
    setIsSearchExpanded(!isSearchExpanded);
  };

  // Check if the current route matches
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Close search on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isSearchExpanded) {
        setIsSearchExpanded(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchExpanded]);

  return (
    <ScrollHeader>
      <nav className={cn(
        "container flex items-center justify-between py-3 px-4 lg:py-2 transition-all duration-300",
        isSearchExpanded && "md:justify-center"
      )}>
        {/* Logo and navigation */}
        <div className={cn(
          "flex items-center space-x-4 lg:space-x-8",
          isSearchExpanded && "md:hidden"
        )}>
          <NavbarLogo />

          {/* Desktop Navigation */}
          {!isMobile && <DesktopNav isActive={isActive} />}
        </div>

        {/* Search bar for desktop */}
        {!isMobile && (
          <div className={cn(
            "hidden md:flex items-center mx-4",
            isSearchExpanded ? "flex-1 max-w-2xl" : "flex-1 max-w-xs"
          )}>
            <SearchBar 
              isExpanded={isSearchExpanded}
              onExpand={() => setIsSearchExpanded(true)}
              onCollapse={() => setIsSearchExpanded(false)}
            />
          </div>
        )}

        {/* Desktop Auth Buttons */}
        <div className={cn(
          "hidden md:flex items-center space-x-4",
          isSearchExpanded && "md:hidden"
        )}>
          {isAuthenticated ? (
            <UserMenu 
              currentUser={currentUser} 
              onLogout={handleLogout}
            />
          ) : (
            <AuthButtons />
          )}
        </div>

        {/* Mobile Search Button */}
        {isMobile && (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Search">
                <Search className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="pt-10">
              <SearchBar className="w-full" />
            </SheetContent>
          </Sheet>
        )}

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
      
      {/* Optional Navigation Separator */}
      <Separator className="hidden md:block" />
    </ScrollHeader>
  );
};

export default Navbar;
