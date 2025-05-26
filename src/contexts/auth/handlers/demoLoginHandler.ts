
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { mapSupabaseUser } from '../authUtils';
import { determineUserDashboard } from '../redirectionUtils';
import { UserRole } from '../types';

// Enhanced demo account login handler with improved role assignment
export const handleLoginWithDemo = async (
  account: any,
  setCurrentUser: Function,
  setIsAuthenticated: Function,
  setIsLoggingIn: Function,
  callback?: (targetDashboard?: string) => void
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
    
    // Enhanced role assignment in user_roles table
    try {
      console.log(`🔧 Ensuring role ${account.role} exists in user_roles for ${data.user.id}`);
      
      // Check if role exists in user_roles
      const { data: existingRole, error: checkError } = await supabase
        .from('user_roles')
        .select('id')
        .eq('user_id', data.user.id)
        .eq('role', account.role)
        .maybeSingle();
        
      if (checkError) {
        console.warn("⚠️ Error checking existing role:", checkError);
      }
      
      // If role doesn't exist, create it
      if (!existingRole) {
        const { error: insertError } = await supabase
          .from('user_roles')
          .insert({
            user_id: data.user.id,
            role: account.role as UserRole
          });
          
        if (insertError) {
          console.warn("⚠️ Could not create role in user_roles:", insertError);
        } else {
          console.log(`✅ Created role ${account.role} in user_roles for demo user`);
        }
      } else {
        console.log(`✅ Role ${account.role} already exists in user_roles`);
      }
    } catch (err) {
      console.warn("⚠️ Error managing user roles:", err);
    }
    
    // Force update user metadata to ensure demo flag
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
    
    // Get full user profile with enhanced metadata and role info
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
    
    // Force ensure demo flag and correct role
    user.is_demo = true;
    
    // Enhanced role verification and assignment
    if (!user.roles || !user.roles.includes(account.role)) {
      console.log(`🔧 Forcing role assignment: ${account.role} for demo user`);
      user.roles = user.roles || [];
      if (!user.roles.includes(account.role)) {
        user.roles.push(account.role);
      }
    }
    
    console.log(`✅ Demo user final roles: ${user.roles.join(', ')}`);
    
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
    return user;
  } catch (error) {
    throw error;
  } finally {
    // Ensure loading state is reset
    setIsLoggingIn(false);
  }
};
