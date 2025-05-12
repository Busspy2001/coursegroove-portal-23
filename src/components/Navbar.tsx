
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Bell, Search, Globe } from "lucide-react";
import { useAuth } from "@/contexts/auth";
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
  const {
    currentUser,
    logout,
    isAuthenticated
  } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const handleLogout = async () => {
    // Utilise le callback pour rediriger seulement après déconnexion complète
    await logout(() => {
      navigate("/login");
    });
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
    <header className="relative z-50 w-full">
      {/* Main header with logo first */}
      <ScrollHeader>
        <nav className={cn("container flex items-center justify-between transition-all duration-300 px-[20px]", 
            isMobile ? "h-14 py-[25px]" : "h-14 py-[35px]"
        )}>
          {/* Logo */}
          <div className="flex-shrink-0 mx-auto lg:mx-0">
            <NavbarLogo />
          </div>

          {/* Desktop Navigation - centered */}
          {!isMobile && <DesktopNav isActive={isActive} />}

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? <UserMenu currentUser={currentUser} onLogout={handleLogout} /> : <AuthButtons />}
          </div>

          {/* Mobile Search Button */}
          {isMobile && <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden" aria-label="Search">
                  <Search className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="top" className="pt-10">
                <SearchBar className="w-full" />
              </SheetContent>
            </Sheet>}
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && <MobileMenu isAuthenticated={isAuthenticated} currentUser={currentUser} isActive={isActive} onLogout={handleLogout} onClose={closeMobileMenu} />}
        
        {/* Optional Navigation Separator */}
        <Separator className="hidden md:block" />
      </ScrollHeader>

      {/* Search bar positioned below main header */}
      {!isMobile}
    </header>
  );
};

export default Navbar;
