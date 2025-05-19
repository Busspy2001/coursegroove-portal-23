
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import { Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

// This component handles intelligent redirection for demo accounts
const DemoRedirect = () => {
  const { currentUser, isAuthenticated, isLoading, authStateReady } = useAuth();
  const navigate = useNavigate();
  const [redirectAttempt, setRedirectAttempt] = useState(0);
  const [redirectStarted, setRedirectStarted] = useState(false);
  
  useEffect(() => {
    // Only proceed with redirection when auth state is ready
    if (!authStateReady || isLoading) {
      console.log("🕒 Attente de la vérification d'authentification...");
      return;
    }
    
    // Safety check to prevent infinite loops
    if (redirectAttempt > 3) {
      console.log("⚠️ Trop de tentatives de redirection, retour à la page d'accueil");
      toast({
        title: "Problème de redirection",
        description: "Nous avons rencontré un problème lors de la redirection. Veuillez réessayer.",
        variant: "destructive",
      });
      navigate("/", { replace: true });
      return;
    }
    
    // Prevent multiple redirections
    if (redirectStarted) {
      return;
    }
    
    // Set a small delay before redirecting to ensure state is stable
    const redirectTimer = setTimeout(() => {
      if (!isAuthenticated || !currentUser) {
        console.log("🚫 Utilisateur non authentifié, redirection vers la page de login");
        navigate("/login", { replace: true });
        return;
      }
      
      setRedirectStarted(true);
      
      // Increment attempt counter
      setRedirectAttempt(prev => prev + 1);
      
      // Log information for debugging
      console.log(`🧭 Redirection intelligente pour: ${currentUser.email} (${currentUser.roles?.join(', ')})`);
      
      // Email-based redirection for demo accounts
      const email = currentUser.email?.toLowerCase() || '';
      const roles = currentUser.roles || [];
      
      // First try to redirect by role (most reliable way)
      if (roles.includes('instructor')) {
        console.log("👨‍🏫 Redirection par rôle vers le tableau de bord instructeur");
        navigate("/instructor", { replace: true });
        return;
      } 
      
      if (roles.includes('admin') || roles.includes('super_admin')) {
        console.log("👑 Redirection par rôle vers le tableau de bord administrateur");
        navigate("/admin", { replace: true });
        return;
      } 
      
      if (roles.includes('business_admin')) {
        console.log("🏢 Redirection par rôle vers le tableau de bord entreprise");
        navigate("/entreprise", { replace: true });
        return;
      } 
      
      if (roles.includes('employee')) {
        console.log("👔 Redirection par rôle vers le tableau de bord employé");
        navigate("/employee", { replace: true });
        return;
      }
      
      if (roles.includes('student')) {
        console.log("🎓 Redirection par rôle vers le tableau de bord étudiant");
        navigate("/student", { replace: true });
        return;
      }
      
      // No role or special case - try to detect from email for demo accounts
      if (currentUser.is_demo) {
        // Explicit redirection based on email patterns
        if (email.includes('prof') || email.includes('instructor')) {
          console.log("👨‍🏫 Redirection par email vers le tableau de bord instructeur");
          navigate("/instructor", { replace: true });
          return;
        } 
        
        if (email.includes('admin')) {
          console.log("👑 Redirection par email vers le tableau de bord administrateur");
          navigate("/admin", { replace: true });
          return;
        } 
        
        if (email.includes('business') || email.includes('entreprise')) {
          console.log("🏢 Redirection par email vers le tableau de bord entreprise");
          navigate("/entreprise", { replace: true });
          return;
        } 
        
        if (email.includes('employee')) {
          console.log("👔 Redirection par email vers le tableau de bord employé");
          navigate("/employee", { replace: true });
          return;
        } 
        
        console.log("🎓 Redirection par défaut vers le tableau de bord étudiant");
        navigate("/student", { replace: true });
        return;
      } 
      
      // Default fallback if nothing else matches
      console.log("🎓 Redirection vers le tableau de bord par défaut (étudiant)");
      navigate("/student", { replace: true });
      
    }, 500); // Delay for more stability
    
    return () => clearTimeout(redirectTimer);
  }, [currentUser, isAuthenticated, isLoading, authStateReady, navigate, redirectAttempt, redirectStarted]);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 max-w-md w-full text-center">
        <Loader2 className="h-12 w-12 animate-spin text-schoolier-teal mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Redirection en cours</h2>
        <p className="text-muted-foreground mb-4">
          Nous vous redirigeons vers votre tableau de bord...
        </p>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
          <div className="bg-schoolier-teal h-2.5 rounded-full animate-pulse w-full"></div>
        </div>
      </div>
    </div>
  );
};

export default DemoRedirect;
