import { Suspense, ReactNode } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Loader2 } from "lucide-react";
import { appRoutes } from "@/routes";

// Loading component
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <Loader2 className="h-10 w-10 text-schoolier-blue animate-spin" />
  </div>
);

interface AppRoutesProps {
  children?: ReactNode;
}

export const AppRoutes = ({ children }: AppRoutesProps) => {
  const location = useLocation();
  
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes location={location}>
        {appRoutes.map((route, index) => {
          // If the route has children, we need to render them with their own parent element
          if (route.children) {
            return (
              <Route key={index} path={route.path} element={route.element}>
                {route.children.map((childRoute, childIndex) => (
                  <Route
                    key={`${index}-${childIndex}`}
                    path={childRoute.path}
                    element={childRoute.element}
                  />
                ))}
              </Route>
            );
          }
          
          // Otherwise, render the route as normal
          return (
            <Route
              key={index}
              path={route.path}
              element={route.element}
            />
          );
        })}
      </Routes>
      {children}
    </Suspense>
  );
};
