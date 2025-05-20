
import { supabase } from '@/integrations/supabase/client';
import { User, UserRole } from '@/contexts/auth/types';
import { toast } from '@/hooks/use-toast';

/**
 * Service for handling authentication with Supabase
 */
export const authService = {
  /**
   * Get the current user session and profile
   */
  getCurrentUser: async (): Promise<User | null> => {
    try {
      // First check if we have a session
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        console.error("Error fetching session:", sessionError);
        return null;
      }
      
      if (!sessionData.session) {
        console.log("No active session found");
        return null;
      }
      
      const userId = sessionData.session.user.id;
      
      // Fetch the user's roles
      const { data: roles, error: rolesError } = await supabase
        .rpc('get_user_roles', { _user_id: userId });
        
      if (rolesError) {
        console.error("Error fetching user roles:", rolesError);
      }
      
      // Fetch the user's profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles_unified')
        .select('*')
        .eq('id', userId)
        .maybeSingle();
        
      if (profileError) {
        console.error("Error fetching user profile:", profileError);
      }
      
      // Create the user object with all available information
      const user: User = {
        id: userId,
        email: sessionData.session.user.email || '',
        name: profile?.full_name || sessionData.session.user.user_metadata?.name || '',
        roles: roles?.length ? roles : (profile?.role ? [profile.role] : ['student']),
        avatar: profile?.avatar_url,
        avatar_url: profile?.avatar_url,
        is_demo: profile?.is_demo || false,
        company_id: profile?.company_id
      };
      
      return user;
    } catch (error) {
      console.error("Error in getCurrentUser:", error);
      return null;
    }
  },
  
  /**
   * Login with email and password
   */
  login: async (email: string, password: string): Promise<User> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      
      if (!data.user) {
        throw new Error("No user data returned after login");
      }
      
      // Get complete user data including roles
      const user = await authService.getCurrentUser();
      
      if (!user) {
        throw new Error("Failed to get user profile after login");
      }
      
      return user;
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        title: "Erreur de connexion",
        description: error.message || "Une erreur s'est produite lors de la connexion",
        variant: "destructive"
      });
      throw error;
    }
  },
  
  /**
   * Register a new user
   */
  register: async (email: string, password: string, name: string, profileType: string = 'student'): Promise<User> => {
    try {
      // Determine the role based on the profile type
      const role = profileType === 'instructor' ? 'instructor' : 
                  profileType === 'business' ? 'business_admin' :
                  profileType === 'employee' ? 'employee' : 'student';
                  
      // Register the user with metadata for profile creation
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            role: role,
            // For business and employee, add more metadata
            ...(profileType === 'business' || profileType === 'employee') && {
              company: true
            }
          }
        }
      });
      
      if (error) throw error;
      
      if (!data.user) {
        throw new Error("No user data returned after registration");
      }
      
      toast({
        title: "Inscription réussie",
        description: "Votre compte a été créé avec succès"
      });
      
      // Get complete user data including roles
      const user = await authService.getCurrentUser();
      
      if (!user) {
        throw new Error("Failed to get user profile after registration");
      }
      
      return user;
    } catch (error: any) {
      console.error("Registration error:", error);
      toast({
        title: "Erreur d'inscription",
        description: error.message || "Une erreur s'est produite lors de l'inscription",
        variant: "destructive"
      });
      throw error;
    }
  },
  
  /**
   * Logout the current user
   */
  logout: async (): Promise<void> => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
      toast({
        title: "Déconnexion réussie",
        description: "Vous avez été déconnecté avec succès"
      });
    } catch (error: any) {
      console.error("Logout error:", error);
      toast({
        title: "Erreur de déconnexion",
        description: error.message || "Une erreur s'est produite lors de la déconnexion",
        variant: "destructive"
      });
      throw error;
    }
  },
  
  /**
   * Check if the user has a specific role
   */
  hasRole: (user: User | null, role: UserRole): boolean => {
    if (!user || !user.roles) return false;
    return user.roles.includes(role);
  },
  
  /**
   * Get the primary role of the user for display purposes
   */
  getPrimaryRole: (user: User | null): UserRole => {
    if (!user || !user.roles || user.roles.length === 0) {
      return 'student';
    }
    
    // Priority order for primary role
    const rolePriority: UserRole[] = ['super_admin', 'admin', 'business_admin', 'instructor', 'employee', 'student'];
    
    for (const role of rolePriority) {
      if (user.roles.includes(role)) {
        return role;
      }
    }
    
    return user.roles[0];
  }
};
