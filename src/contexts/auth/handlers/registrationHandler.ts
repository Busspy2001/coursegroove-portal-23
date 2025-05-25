
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { mapSupabaseUser } from '../authUtils';

// Registration handler
export const handleRegister = async (
  email: string,
  password: string,
  name: string,
  setCurrentUser: Function,
  setIsAuthenticated: Function,
  callback?: () => void
) => {
  try {
    // Register with Supabase
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name,
          full_name: name,
        }
      }
    });

    if (error) {
      console.error("❌ Registration failed:", error.message);
      toast({
        title: "Échec de l'inscription",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }

    if (!data.user) {
      const errorMsg = "No user data returned after registration";
      console.error("❌", errorMsg);
      toast({
        title: "Erreur d'inscription",
        description: errorMsg,
        variant: "destructive",
      });
      throw new Error(errorMsg);
    }

    // Get user profile using the correct function
    const user = await mapSupabaseUser(data.user);
    
    if (!user) {
      const errorMsg = "Impossible de récupérer le profil après inscription";
      console.error("❌", errorMsg);
      toast({
        title: "Erreur d'inscription",
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
      title: "Inscription réussie",
      description: "Votre compte a été créé avec succès! Bienvenue " + (user.name || ""),
    });

    // Execute callback if provided
    if (callback) callback();
    
    return user;
  } catch (error) {
    throw error;
  }
};
