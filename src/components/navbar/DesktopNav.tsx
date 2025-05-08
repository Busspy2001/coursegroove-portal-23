
import React from "react";
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
import { Laptop, Book, ChartBar, Palette } from "lucide-react";

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
  
  return (
    <NavigationMenu className="hidden lg:flex mx-auto">
      <NavigationMenuList className="gap-1">
        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={cn(
              "font-spartan text-[#334155] hover:text-[#044289] transition-colors px-4",
              isActive("/explore") &&
                "text-schoolier-blue font-medium"
            )}
          >
            Découvrir
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
              {courseCategories.map((category) => (
                <ListItem
                  key={category.title}
                  title={category.title}
                  href={category.href}
                  icon={category.icon}
                >
                  {category.description}
                </ListItem>
              ))}
            </ul>
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
