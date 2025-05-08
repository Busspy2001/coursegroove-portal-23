
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

interface NavItem {
  title: string;
  description: string;
  href: string;
}

interface DesktopNavProps {
  isActive: (path: string) => boolean;
}

// ListItem component for dropdown menu items
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

const DesktopNav: React.FC<DesktopNavProps> = ({ isActive }) => {
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
  );
};

export default DesktopNav;
