
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { mapSupabaseUser } from '../authUtils';
import { determineUserDashboard } from '../redirectionUtils';
import { UserRole } from '../types';

// Map our UserRole types to database-compatible types
const mapRoleForDatabase = (role: UserRole) => {
  switch (role) {
    case "admin":
      return "super_admin"; // Database uses super_admin instead of admin
    case "super_admin":
      return "super_admin";
    case "student":
      return "student";
    case "instructor":
      return "instructor";
    case "business_admin":
      return "business_admin";
    case "employee":
      return "employee";
    default:
      return "student"; // Default fallback
  }
};

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
    
    console.log(`🔧 Processing demo account: ${account.email} with role: ${account.role}`);
    
    // Enhanced role assignment in user_roles table
    try {
      const dbRole = mapRoleForDatabase(account.role);
      console.log(`🔧 Mapped role ${account.role} to database role: ${dbRole}`);
      
      // Check if role exists in user_roles
      const { data: existingRole, error: checkError } = await supabase
        .from('user_roles')
        .select('id')
        .eq('user_id', data.user.id)
        .eq('role', dbRole)
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
            role: dbRole
          });
          
        if (insertError) {
          console.warn("⚠️ Could not create role in user_roles:", insertError);
        } else {
          console.log(`✅ Created role ${dbRole} in user_roles for demo user`);
        }
      } else {
        console.log(`✅ Role ${dbRole} already exists in user_roles`);
      }
    } catch (err) {
      console.warn("⚠️ Error managing user roles:", err);
    }
    
    // Force update user metadata to ensure demo flag and correct role info
    try {
      const { error: metadataError } = await supabase.auth.updateUser({
        data: { 
          is_demo: true, 
          demo_role: account.role,
          // Add specific flags for business accounts
          is_business_admin: account.role === 'business_admin'
        }
      });
      
      if (metadataError) {
        console.warn("⚠️ Could not update user metadata for demo flag:", metadataError);
      } else {
        console.log(`✅ Updated user metadata with demo flag and role: ${account.role}`);
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
    
    // Enhanced role verification and assignment - force the correct role for business accounts
    console.log(`🔧 Original user roles: ${user.roles?.join(', ') || 'none'}`);
    
    // Force the role to match the demo account's designated role, especially for business accounts
    if (!user.roles || !user.roles.includes(account.role)) {
      console.log(`🔧 Forcing role assignment: ${account.role} for demo user`);
      user.roles = [account.role]; // Set it as the primary role
    }
    
    // Extra logging for business accounts
    if (account.role === 'business_admin') {
      console.log(`🏢 Business admin demo account configured:`, {
        email: user.email,
        roles: user.roles,
        is_demo: user.is_demo
      });
    }
    
    console.log(`✅ Demo user final roles: ${user.roles.join(', ')}`);
    console.log(`✅ Demo user is_demo flag: ${user.is_demo}`);
    console.log(`✅ Demo user email: ${user.email}`);
    
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
