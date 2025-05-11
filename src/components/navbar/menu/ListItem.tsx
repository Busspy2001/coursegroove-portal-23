
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

// ListItem component for dropdown menu items with icon support
const ListItem = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<"a"> & {
    title: string;
    href: string;
    icon?: React.ReactNode;
  }
>(({ className, title, children, icon, href, ...props }, ref) => {
  return (
    <li>
      <Link
        ref={ref}
        to={href}
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
      </Link>
    </li>
  );
});

ListItem.displayName = "ListItem";

export default ListItem;
