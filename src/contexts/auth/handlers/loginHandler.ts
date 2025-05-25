
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { mapSupabaseUser } from '../authUtils';

// Authentication function for handling login
export const handleLogin = async (
  email: string,
  password: string,
  setCurrentUser: Function,
  setIsAuthenticated: Function,
  setIsLoggingIn: Function,
  callback?: () => void
) => {
  try {
    // Sign in with Supabase
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      console.error("❌ Login failed:", error.message);
      toast({
        title: "Échec de connexion",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }

    if (!data.user) {
      const errorMsg = "Aucune donnée d'utilisateur reçue après connexion";
      console.error("❌", errorMsg);
      toast({
        title: "Erreur de connexion",
        description: errorMsg,
        variant: "destructive",
      });
      throw new Error(errorMsg);
    }

    // Get user profile using the correct function
    const user = await mapSupabaseUser(data.user);
    
    if (!user) {
      const errorMsg = "Impossible de récupérer le profil utilisateur après connexion";
      console.error("❌", errorMsg);
      toast({
        title: "Erreur de connexion",
        description: errorMsg,
        variant: "destructive",
      });
      throw new Error(errorMsg);
    }

    // Update auth state
    setCurrentUser(user);
    setIsAuthenticated(true);
    
    // Show success message
    toast({
      title: "Connexion réussie",
      description: `Bienvenue, ${user.name || user.email}!`,
    });

    // Execute callback if provided
    if (callback) callback();
    
    return user;
  } catch (error) {
    throw error;
  } finally {
    setIsLoggingIn(false);
  }
};
