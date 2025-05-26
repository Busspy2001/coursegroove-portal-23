
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { mapSupabaseUser } from '../authUtils';
import { determineUserDashboard } from '../redirectionUtils';

// Demo account login handler with centralized redirection
export const handleLoginWithDemo = async (
  account: any,
  setCurrentUser: Function,
  setIsAuthenticated: Function,
  setIsLoggingIn: Function,
  callback?: () => void
) => {
  try {
    console.log("🎭 Demo login attempt for:", account.email, "role:", account.role);
    
    // Sign in with demo account credentials 
    const { data, error } = await supabase.auth.signInWithPassword({ 
      email: account.email, 
      password: account.password 
    });
    
    if (error) {
      console.error("❌ Demo login failed:", error.message);
      toast({
        title: "Échec de connexion démo",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
    
    if (!data.user) {
      const errorMsg = "Aucune donnée d'utilisateur reçue pour le compte démo";
      console.error("❌", errorMsg);
      toast({
        title: "Erreur de connexion démo",
        description: errorMsg,
        variant: "destructive",
      });
      throw new Error(errorMsg);
    }
    
    // Force indicate this is a demo account in metadata
    try {
      const { error: metadataError } = await supabase.auth.updateUser({
        data: { is_demo: true }
      });
      
      if (metadataError) {
        console.warn("⚠️ Could not update user metadata for demo flag:", metadataError);
      }
    } catch (err) {
      console.warn("⚠️ Error updating user metadata:", err);
    }
    
    // Get full user profile with metadata and role info
    const user = await mapSupabaseUser(data.user);
    
    if (!user) {
      const errorMsg = "Impossible de récupérer le profil du compte démo";
      console.error("❌", errorMsg);
      toast({
        title: "Erreur de connexion démo",
        description: errorMsg,
        variant: "destructive",
      });
      throw new Error(errorMsg);
    }
    
    // Ensure demo flag is set - this is critical for redirection
    user.is_demo = true;
    
    // Enhanced role assignment based on email patterns and account role
    const email = account.email.toLowerCase();
    
    if (email.includes('prof') || email.includes('instructor') || account.role === 'instructor') {
      if (!user.roles || !user.roles.includes('instructor')) {
        user.roles = user.roles || [];
        if (!user.roles.includes('instructor')) {
          user.roles.push('instructor');
        }
      }
      console.log("👨‍🏫 Demo instructor role assigned");
    } else if (email.includes('business') || email.includes('entreprise') || account.role === 'business_admin') {
      if (!user.roles || !user.roles.includes('business_admin')) {
        user.roles = user.roles || [];
        if (!user.roles.includes('business_admin')) {
          user.roles.push('business_admin');
        }
      }
      console.log("🏢 Demo business admin role assigned");
    } else if (email.includes('employee') || account.role === 'employee') {
      if (!user.roles || !user.roles.includes('employee')) {
        user.roles = user.roles || [];
        if (!user.roles.includes('employee')) {
          user.roles.push('employee');
        }
      }
      console.log("👔 Demo employee role assigned");
    } else if (email.includes('admin') || account.role === 'admin') {
      if (!user.roles || !user.roles.includes('admin')) {
        user.roles = user.roles || [];
        if (!user.roles.includes('admin')) {
          user.roles.push('admin');
        }
      }
      console.log("👑 Demo admin role assigned");
    } else {
      // Default to student
      if (!user.roles || !user.roles.includes('student')) {
        user.roles = user.roles || [];
        if (!user.roles.includes('student')) {
          user.roles.push('student');
        }
      }
      console.log("🎓 Demo student role assigned");
    }
    
    // Update auth state
    setCurrentUser(user);
    setIsAuthenticated(true);
    
    // Determine correct dashboard using centralized logic
    const targetDashboard = determineUserDashboard(user);
    console.log("🎯 Demo login - Target dashboard:", targetDashboard);
    
    toast({
      title: "Connexion démo réussie",
      description: `Bienvenue sur le compte de démonstration: ${account.name || account.email}!`,
    });
    
    // Execute callback if provided with redirection info
    if (callback) {
      setTimeout(() => {
        callback(targetDashboard);
      }, 100);
    }
    
    console.log("✅ Demo login successful for:", account.email, "redirecting to:", targetDashboard);
    return { user, targetDashboard };
  } catch (error) {
    throw error;
  } finally {
    // Ensure loading state is reset
    setIsLoggingIn(false);
  }
};
