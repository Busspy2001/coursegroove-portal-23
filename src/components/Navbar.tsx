
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import {
  Menu,
  X,
  Search,
  ChevronDown,
  Bell,
  Home,
  Settings,
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const { currentUser, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
  >(({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  });
  ListItem.displayName = "ListItem";

  const courseCategories = [
    {
      title: "Développement Web",
      description: "HTML, CSS, JavaScript et frameworks modernes",
      href: "/courses?category=web",
    },
    {
      title: "Data Science",
      description: "Python, R et analyse de données",
      href: "/courses?category=data",
    },
    {
      title: "Design & UX",
      description: "Figma, Adobe XD et principes de design",
      href: "/courses?category=design",
    },
    {
      title: "Marketing Digital",
      description: "SEO, SEM, médias sociaux et stratégie de contenu",
      href: "/courses?category=marketing",
    },
  ];

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled 
          ? "bg-white/80 dark:bg-schoolier-dark/80 backdrop-blur-md shadow-sm" 
          : "bg-white dark:bg-schoolier-dark"
      )}
    >
      <nav className="container flex items-center justify-between p-4">
        <div className="flex items-center space-x-8">
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/15fccc6e-df41-4aa0-9708-c5ef28cab8cd.png" 
              alt="Schoolier Logo" 
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          {!isMobile && (
            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/">
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        isActive("/") &&
                          "bg-accent text-accent-foreground font-medium"
                      )}
                    >
                      Accueil
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={cn(
                      isActive("/courses") &&
                        "bg-accent text-accent-foreground font-medium"
                    )}
                  >
                    Cours
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                      {courseCategories.map((category) => (
                        <ListItem
                          key={category.title}
                          title={category.title}
                          href={category.href}
                        >
                          {category.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link to="/about">
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        isActive("/about") &&
                          "bg-accent text-accent-foreground font-medium"
                      )}
                    >
                      À propos
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Link to="/contact">
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        isActive("/contact") &&
                          "bg-accent text-accent-foreground font-medium"
                      )}
                    >
                      Contact
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          )}
        </div>

        {/* Search bar for desktop */}
        <div className="hidden md:flex items-center mx-4 flex-1 max-w-xs">
          <div className="relative w-full">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <Search className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </div>
            <input
              type="search"
              className="bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-schoolier-blue focus:border-schoolier-blue block w-full ps-10 p-2"
              placeholder="Rechercher un cours..."
            />
          </div>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <div className="flex items-center justify-between px-4 py-2 border-b">
                    <span className="font-medium">Notifications</span>
                    <Button variant="ghost" size="sm">
                      Tout marquer comme lu
                    </Button>
                  </div>
                  <div className="py-2 max-h-80 overflow-y-auto">
                    <div className="px-4 py-2 hover:bg-accent cursor-pointer">
                      <p className="text-sm font-medium">Nouveau cours disponible</p>
                      <p className="text-xs text-muted-foreground">Il y a 2 heures</p>
                    </div>
                    <div className="px-4 py-2 hover:bg-accent cursor-pointer">
                      <p className="text-sm font-medium">Votre certificat est prêt</p>
                      <p className="text-xs text-muted-foreground">Il y a 1 jour</p>
                    </div>
                  </div>
                  <div className="p-2 border-t">
                    <Button variant="ghost" size="sm" className="w-full justify-center">
                      Voir toutes les notifications
                    </Button>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <div className="flex items-center">
                      <img
                        src={currentUser?.avatar || "https://ui-avatars.com/api/?name=User&background=0D9488&color=fff"}
                        alt="User"
                        className="h-8 w-8 rounded-full object-cover border-2 border-schoolier-teal"
                      />
                      <div className="ml-2 text-left hidden lg:block">
                        <p className="text-sm font-medium">{currentUser?.name}</p>
                        <p className="text-xs text-muted-foreground">{currentUser?.email}</p>
                      </div>
                      <ChevronDown className="h-4 w-4 ml-1" />
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex items-center space-x-2 p-2 border-b lg:hidden">
                    <div>
                      <p className="font-medium">{currentUser?.name}</p>
                      <p className="text-xs text-muted-foreground">{currentUser?.email}</p>
                    </div>
                  </div>
                  <DropdownMenuItem onClick={() => navigate("/dashboard")} className="cursor-pointer">
                    <Home className="mr-2 h-4 w-4" />
                    Tableau de bord
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/profile")} className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    Mon profil
                  </DropdownMenuItem>
                  {currentUser?.role === "instructor" && (
                    <DropdownMenuItem onClick={() => navigate("/instructor")} className="cursor-pointer">
                      <Book className="mr-2 h-4 w-4" />
                      Espace instructeur
                    </DropdownMenuItem>
                  )}
                  {currentUser?.role === "admin" && (
                    <DropdownMenuItem onClick={() => navigate("/admin")} className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      Administration
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-500 cursor-pointer">
                    Déconnexion
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <>
              <Button 
                variant="ghost" 
                onClick={() => navigate("/login")}
                className="hover:bg-schoolier-blue/10 hover:text-schoolier-blue"
              >
                Connexion
              </Button>
              <Button 
                onClick={() => navigate("/register")}
                className="bg-gradient-to-r from-schoolier-blue to-schoolier-teal hover:opacity-90 transition-opacity"
              >
                Inscription
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden text-gray-600 dark:text-gray-300 focus:outline-none"
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
        <div className="md:hidden bg-white dark:bg-schoolier-dark border-t animate-fade-in">
          {/* Mobile Search */}
          <div className="p-4 border-b">
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <Search className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </div>
              <input
                type="search"
                className="bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-schoolier-blue focus:border-schoolier-blue block w-full ps-10 p-2"
                placeholder="Rechercher un cours..."
              />
            </div>
          </div>
          
          <div className="flex flex-col space-y-1 p-2">
            <Link
              to="/"
              className={`p-3 rounded-md ${isActive("/") ? "bg-accent" : "hover:bg-muted"}`}
              onClick={closeMobileMenu}
            >
              Accueil
            </Link>
            <Link
              to="/courses"
              className={`p-3 rounded-md ${isActive("/courses") ? "bg-accent" : "hover:bg-muted"}`}
              onClick={closeMobileMenu}
            >
              Cours
            </Link>
            <Link
              to="/about"
              className={`p-3 rounded-md ${isActive("/about") ? "bg-accent" : "hover:bg-muted"}`}
              onClick={closeMobileMenu}
            >
              À propos
            </Link>
            <Link
              to="/contact"
              className={`p-3 rounded-md ${isActive("/contact") ? "bg-accent" : "hover:bg-muted"}`}
              onClick={closeMobileMenu}
            >
              Contact
            </Link>
          </div>
          
          {isAuthenticated ? (
            <div className="border-t p-4">
              <div className="flex items-center space-x-3 mb-4">
                <img
                  src={currentUser?.avatar || "https://ui-avatars.com/api/?name=User&background=0D9488&color=fff"}
                  alt="User"
                  className="h-10 w-10 rounded-full"
                />
                <div>
                  <p className="font-medium">{currentUser?.name}</p>
                  <p className="text-xs text-muted-foreground">{currentUser?.email}</p>
                </div>
              </div>
              
              <div className="grid gap-2">
                <Link
                  to="/dashboard"
                  className="flex items-center p-2 hover:bg-accent rounded-md"
                  onClick={closeMobileMenu}
                >
                  <Home className="h-4 w-4 mr-2" />
                  Tableau de bord
                </Link>
                <Link
                  to="/profile"
                  className="flex items-center p-2 hover:bg-accent rounded-md"
                  onClick={closeMobileMenu}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Mon profil
                </Link>
                {currentUser?.role === "instructor" && (
                  <Link
                    to="/instructor"
                    className="flex items-center p-2 hover:bg-accent rounded-md"
                    onClick={closeMobileMenu}
                  >
                    <Book className="h-4 w-4 mr-2" />
                    Espace instructeur
                  </Link>
                )}
                {currentUser?.role === "admin" && (
                  <Link
                    to="/admin"
                    className="flex items-center p-2 hover:bg-accent rounded-md"
                    onClick={closeMobileMenu}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Administration
                  </Link>
                )}
                <Button variant="destructive" onClick={handleLogout} className="mt-2">
                  Déconnexion
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col space-y-2 p-4 border-t">
              <Button onClick={() => { navigate("/login"); closeMobileMenu(); }}>
                Connexion
              </Button>
              <Button 
                variant="outline" 
                onClick={() => { navigate("/register"); closeMobileMenu(); }}
                className="border-schoolier-teal text-schoolier-teal hover:bg-schoolier-teal/10"
              >
                Inscription
              </Button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
