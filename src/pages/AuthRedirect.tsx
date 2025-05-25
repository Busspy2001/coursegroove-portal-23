
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
    
    // Enhanced demo account detection based on email patterns
    const email = currentUser.email?.toLowerCase() || '';
    const isDemoInstructor = currentUser.is_demo && email.includes('prof');
    const isDemoBusinessAccount = currentUser.is_demo && 
      (email.includes('business') || email.includes('entreprise'));
    const isDemoEmployee = currentUser.is_demo && email.includes('employee');
    
    console.log(`🎯 AuthRedirect - Redirecting based on:`, {
      roles: currentUser.roles,
      isDemoInstructor,
      isDemoBusinessAccount,
      isDemoEmployee,
      email: currentUser.email,
      is_demo: currentUser.is_demo
    });
    
    // Priority to demo accounts based on email
    if (isDemoInstructor) {
      console.log("👨‍🏫 AuthRedirect - Demo instructor redirection to /instructor");
      navigate("/instructor", { replace: true });
      toast({
        title: "Bienvenue, Instructeur",
        description: "Vous êtes connecté à votre tableau de bord instructeur."
      });
      return;
    }
    
    if (isDemoBusinessAccount) {
      console.log("🏢 AuthRedirect - Demo business redirection to /entreprise");
      navigate("/entreprise", { replace: true });
      toast({
        title: "Bienvenue, Admin Entreprise",
        description: "Vous êtes connecté à votre tableau de bord entreprise."
      });
      return;
    }
    
    if (isDemoEmployee) {
      console.log("👔 AuthRedirect - Demo employee redirection to /employee");
      navigate("/employee", { replace: true });
      toast({
        title: "Bienvenue, Employé",
        description: "Vous êtes connecté à votre tableau de bord employé."
      });
      return;
    }
    
    // Then check standard roles
    if (hasRole("super_admin")) {
      navigate("/admin", { replace: true });
      toast({
        title: "Welcome, Super Administrator",
        description: "You are now logged in with full administrative privileges."
      });
    } else if (hasRole("admin")) {
      navigate("/admin", { replace: true });
      toast({
        title: "Welcome, Administrator",
        description: "You are now logged in as an administrator."
      });
    } else if (hasRole("instructor")) {
      console.log("👨‍🏫 AuthRedirect - Standard instructor redirection to /instructor");
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
      navigate("/employee", { replace: true });
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
