
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AuthRedirect: React.FC = () => {
  const { currentUser, hasRole, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (isLoading) return;
    
    if (!isAuthenticated || !currentUser) {
      console.log("User not authenticated, redirecting to /login");
      navigate("/login", { replace: true });
      return;
    }
    
    // Check for demo instructor account based on email
    const isDemoInstructor = currentUser.is_demo && 
      currentUser.email?.toLowerCase().includes('prof');
    
    console.log(`Redirecting based on role: ${JSON.stringify({
      roles: currentUser.roles,
      isDemoInstructor,
      email: currentUser.email
    })}`);
    
    // Redirect based on user role
    if (hasRole("super_admin") || hasRole("admin")) {
      navigate("/admin", { replace: true });
      toast({
        title: "Welcome, Administrator",
        description: "You are now logged in as an administrator."
      });
    } else if (hasRole("instructor") || isDemoInstructor) {
      console.log("Redirecting to /instructor");
      navigate("/instructor", { replace: true });
      toast({
        title: "Welcome, Instructor",
        description: "You are now logged in to your instructor dashboard."
      });
    } else if (hasRole("business_admin")) {
      navigate("/entreprise", { replace: true });
      toast({
        title: "Welcome, Business Admin",
        description: "You are now logged in to your business dashboard."
      });
    } else if (hasRole("employee")) {
      navigate("/employe", { replace: true });
      toast({
        title: "Welcome, Employee",
        description: "You are now logged in to your learning dashboard."
      });
    } else {
      // Default to student dashboard
      navigate("/student", { replace: true });
      toast({
        title: "Welcome to Schoolier",
        description: "You are now logged in to your learning dashboard."
      });
    }
  }, [currentUser, hasRole, isAuthenticated, isLoading, navigate, toast]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-12 w-12 text-schoolier-blue animate-spin" />
        <p className="text-xl font-medium">Redirecting to your dashboard...</p>
      </div>
    </div>
  );
};

export default AuthRedirect;
