
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Laptop, Book, ChartBar, Palette, Shield, Network, Cloud, Code } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface NavItem {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
}

interface DesktopNavProps {
  isActive: (path: string) => boolean;
}

// ListItem component for dropdown menu items with icon support
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & {
    title: string;
    icon?: React.ReactNode; // Add icon as an optional prop
  }
>(({ className, title, children, icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "flex select-none space-x-3 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          {icon && <div className="mt-1">{icon}</div>}
          <div>
            <div className="text-sm font-medium leading-none mb-1">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </div>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

const DesktopNav: React.FC<DesktopNavProps> = ({ isActive }) => {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  
  // Course categories
  const courseCategories = [
    {
      title: "Développement Web",
      description: "HTML, CSS, JavaScript et frameworks modernes",
      href: "/courses?category=web",
      icon: <Laptop className="h-5 w-5 text-schoolier-blue" />
    },
    {
      title: "Data Science",
      description: "Python, R et analyse de données",
      href: "/courses?category=data",
      icon: <ChartBar className="h-5 w-5 text-schoolier-teal" />
    },
    {
      title: "Design & UX",
      description: "Figma, Adobe XD et principes de design",
      href: "/courses?category=design",
      icon: <Palette className="h-5 w-5 text-schoolier-green" />
    },
    {
      title: "Marketing Digital",
      description: "SEO, SEM, médias sociaux et stratégie de contenu",
      href: "/courses?category=marketing",
      icon: <Book className="h-5 w-5 text-schoolier-yellow" />
    },
  ];

  // Certification providers
  const certificationProviders = [
    { name: "Microsoft", href: "/certifications/microsoft" },
    { name: "AWS", href: "/certifications/aws" },
    { name: "Google Cloud", href: "/certifications/google" },
    { name: "Cisco", href: "/certifications/cisco" },
    { name: "CompTIA", href: "/certifications/comptia" },
  ];

  // Popular topics
  const popularTopics = [
    { name: "Certification Cloud", href: "/topics/cloud", icon: <Cloud className="h-4 w-4" /> },
    { name: "Réseautage", href: "/topics/networking", icon: <Network className="h-4 w-4" /> },
    { name: "Cybersécurité", href: "/topics/cybersecurity", icon: <Shield className="h-4 w-4" /> },
    { name: "DevOps", href: "/topics/devops", icon: <Code className="h-4 w-4" /> },
    { name: "Codage", href: "/topics/coding", icon: <Code className="h-4 w-4" /> },
  ];
  
  const handleOpenChange = (open: boolean) => {
    if (!isMobile) return; // Only control open state on mobile
    setOpen(open);
  };
  
  return (
    <NavigationMenu className="hidden lg:flex mx-auto">
      <NavigationMenuList className="gap-1">
        <NavigationMenuItem>
          <NavigationMenuTrigger 
            className={cn(
              "font-spartan text-[#334155] hover:text-[#044289] transition-colors px-4",
              isActive("/explore") && "text-schoolier-blue font-medium",
              "data-[state=open]:text-schoolier-blue"
            )}
            onMouseEnter={() => !isMobile && setOpen(true)}
            onClick={() => isMobile && setOpen(!open)}
            aria-expanded={open}
          >
            Découvrir
          </NavigationMenuTrigger>
          <NavigationMenuContent 
            onMouseLeave={() => !isMobile && setOpen(false)}
            className="w-[900px] rounded-xl shadow-2xl bg-white border border-[#f1f5f9] animate-fade-in"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 bg-white bg-opacity-95 backdrop-blur-sm">
              {/* Column 1: Course Categories */}
              <div className="space-y-4 p-4 rounded-lg hover:bg-[#f8fafc] transition-colors duration-200">
                <h3 className="font-spartan font-bold text-sm mb-4 text-schoolier-blue border-b pb-2 border-schoolier-light-gray">
                  Parcourir les certifications
                </h3>
                <Link to="/certifications" className="block text-sm text-[#64748b] hover:text-schoolier-teal mb-4 transition-colors duration-200 font-medium">
                  Préparation aux certifications
                </Link>
                <ul className="space-y-3">
                  {courseCategories.map((category) => (
                    <li key={category.title} className="group">
                      <Link
                        to={category.href}
                        className="flex items-center text-sm text-[#334155] hover:text-schoolier-blue transition-all duration-200 group-hover:translate-x-1"
                      >
                        {category.icon && <span className="mr-3 flex items-center justify-center w-7 h-7 bg-[#f1f5f9] rounded-md group-hover:bg-[#e2e8f0]">{category.icon}</span>}
                        <span className="font-medium">{category.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 2: Certification Providers */}
              <div className="space-y-4 p-4 rounded-lg hover:bg-[#f8fafc] transition-colors duration-200">
                <h3 className="font-spartan font-bold text-sm mb-4 text-[#334155] border-b pb-2 border-schoolier-light-gray">
                  Émetteurs populaires
                </h3>
                <ul className="space-y-3">
                  {certificationProviders.map((provider) => (
                    <li key={provider.name} className="group">
                      <Link
                        to={provider.href}
                        className="flex text-sm text-[#64748b] hover:text-schoolier-blue transition-all duration-200 font-medium group-hover:translate-x-1"
                      >
                        {provider.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 3: Popular Topics */}
              <div className="space-y-4 p-4 rounded-lg hover:bg-[#f8fafc] transition-colors duration-200">
                <h3 className="font-spartan font-bold text-sm mb-4 text-[#334155] border-b pb-2 border-schoolier-light-gray">
                  Sujets populaires
                </h3>
                <ul className="space-y-3">
                  {popularTopics.map((topic) => (
                    <li key={topic.name} className="group">
                      <Link
                        to={topic.href}
                        className="flex items-center text-sm text-[#64748b] hover:text-schoolier-teal transition-all duration-200 group-hover:translate-x-1"
                      >
                        {topic.icon && <span className="mr-3 flex items-center justify-center w-6 h-6 bg-[#f1f5f9] rounded-md group-hover:bg-[#e2e8f0]">{topic.icon}</span>}
                        <span className="font-medium">{topic.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link to="/business">
            <NavigationMenuLink
              className={cn(
                navigationMenuTriggerStyle(),
                "font-spartan text-[#334155] hover:text-[#044289] transition-colors px-4",
                isActive("/business") &&
                  "text-schoolier-blue font-medium"
              )}
            >
              Schoolier Business
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <Link to="/teach">
            <NavigationMenuLink
              className={cn(
                navigationMenuTriggerStyle(),
                "font-spartan text-[#334155] hover:text-[#044289] transition-colors px-4",
                isActive("/teach") &&
                  "text-schoolier-blue font-medium"
              )}
            >
              Enseigner sur Schoolier
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default DesktopNav;
