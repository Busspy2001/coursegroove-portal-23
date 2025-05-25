
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
  const [redirectTimeout, setRedirectTimeout] = useState<NodeJS.Timeout | null>(null);
  
  // Set a timeout to prevent infinite loading
  useEffect(() => {
    // Set a failsafe timeout to force redirect after 3 seconds
    const timeout = setTimeout(() => {
      console.log("⚠️ DemoRedirect: Forcing redirect due to timeout");
      
      if (!isAuthenticated || !currentUser) {
        navigate("/login", { replace: true });
        return;
      }
      
      // Enhanced fallback redirection based on email patterns
      const email = currentUser.email?.toLowerCase() || '';
      
      if (email.includes('prof') || email.includes('instructor')) {
        console.log("👨‍🏫 Timeout fallback: Redirecting to instructor");
        navigate("/instructor", { replace: true });
      } else if (email.includes('business') || email.includes('entreprise')) {
        console.log("🏢 Timeout fallback: Redirecting to business");
        navigate("/entreprise", { replace: true });
      } else if (email.includes('admin')) {
        console.log("👑 Timeout fallback: Redirecting to admin");
        navigate("/admin", { replace: true });
      } else if (email.includes('employee')) {
        console.log("👔 Timeout fallback: Redirecting to employee");
        navigate("/employee", { replace: true });
      } else {
        console.log("🎓 Timeout fallback: Redirecting to student");
        navigate("/student", { replace: true });
      }
    }, 3000);
    
    setRedirectTimeout(timeout);
    
    return () => {
      if (redirectTimeout) {
        clearTimeout(redirectTimeout);
      }
    };
  }, []);
  
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
    
    // Clear the failsafe timeout since we're handling the redirect now
    if (redirectTimeout) {
      clearTimeout(redirectTimeout);
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
      
      // Email-based redirection for demo accounts - prioritize email patterns
      const email = currentUser.email?.toLowerCase() || '';
      const roles = currentUser.roles || [];
      
      // Enhanced email-based detection for instructor accounts
      if (email.includes('prof') || email.includes('instructor')) {
        console.log("👨‍🏫 Redirection par email vers le tableau de bord instructeur");
        navigate("/instructor", { replace: true });
        return;
      }
      
      // Enhanced email-based detection for business accounts
      if (email.includes('business') || email.includes('entreprise')) {
        console.log("🏢 Redirection par email vers le tableau de bord entreprise");
        navigate("/entreprise", { replace: true });
        return;
      }
      
      // Admin detection
      if (email.includes('admin')) {
        console.log("👑 Redirection par email vers le tableau de bord administrateur");
        navigate("/admin", { replace: true });
        return;
      }
      
      // Employee detection
      if (email.includes('employee')) {
        console.log("👔 Redirection par email vers le tableau de bord employé");
        navigate("/employee", { replace: true });
        return;
      }
      
      // Fallback to role-based redirection if email patterns don't match
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
      
      // Final fallback
      console.log("🎓 Redirection vers le tableau de bord par défaut (étudiant)");
      navigate("/student", { replace: true });
      
    }, 300); // Reduced delay for faster redirection
    
    return () => clearTimeout(redirectTimer);
  }, [currentUser, isAuthenticated, isLoading, authStateReady, navigate, redirectAttempt, redirectStarted, redirectTimeout]);
  
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
