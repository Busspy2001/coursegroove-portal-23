
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import { Loader2 } from "lucide-react";

const AuthRedirect: React.FC = () => {
  const { currentUser, hasRole, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return;
    
    if (!isAuthenticated || !currentUser) {
      navigate("/login", { replace: true });
      return;
    }
    
    // Check for demo instructor account based on email
    const isDemoInstructor = currentUser.is_demo && 
      currentUser.email?.toLowerCase().includes('prof');
    
    // Redirect based on user role
    if (hasRole("admin") || hasRole("super_admin")) {
      navigate("/admin", { replace: true });
    } else if (hasRole("instructor") || isDemoInstructor) {
      navigate("/instructor", { replace: true });
    } else if (hasRole("business_admin")) {
      navigate("/entreprise", { replace: true });
    } else if (hasRole("employee")) {
      navigate("/employee", { replace: true });
    } else {
      // Default to student dashboard
      navigate("/student", { replace: true });
    }
  }, [currentUser, hasRole, isAuthenticated, isLoading, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-12 w-12 text-schoolier-blue animate-spin" />
        <p className="text-xl font-medium">Redirection vers votre tableau de bord...</p>
      </div>
    </div>
  );
};

export default AuthRedirect;
