
import { Suspense, ReactNode } from "react";
import { Routes, Route } from "react-router-dom";
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
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route element={<Layout />}>
          {appRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={route.element}
            />
          ))}
        </Route>
      </Routes>
      {children}
    </Suspense>
  );
};
