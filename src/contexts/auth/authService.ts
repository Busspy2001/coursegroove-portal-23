
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { mapSupabaseUser } from "./authUtils";
import { User } from "./types";

export const authService = {
  login: async (email: string, password: string): Promise<User> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      
      const mappedUser = await mapSupabaseUser(data.user);
      
      if (!mappedUser) {
        throw new Error("User data couldn't be retrieved");
      }
      
      toast({
        title: "Connexion réussie",
        description: `Bienvenue, ${mappedUser.name || 'utilisateur'}!`,
      });
      
      return mappedUser;
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        title: "Erreur de connexion",
        description: error.message || "Impossible de se connecter. Veuillez réessayer.",
        variant: "destructive",
      });
      throw error;
    }
  },

  register: async (name: string, email: string, password: string): Promise<User> => {
    try {
      // Create a new user
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name
          }
        }
      });
      
      if (error) throw error;
      
      if (!data.user) {
        throw new Error("Registration failed");
      }
      
      // Create a profile in the profiles_unified table
      await supabase.from('profiles_unified').insert({
        id: data.user.id,
        full_name: name,
        email: email,
        role: 'student',
        avatar_url: `https://ui-avatars.com/api/?name=${name.replace(" ", "+")}&background=0D9488&color=fff`,
        created_at: new Date().toISOString()
      });
      
      const mappedUser = await mapSupabaseUser(data.user);
      
      if (!mappedUser) {
        throw new Error("User data couldn't be retrieved after registration");
      }
      
      toast({
        title: "Inscription réussie",
        description: "Votre compte a été créé avec succès!",
      });
      
      return mappedUser;
    } catch (error: any) {
      console.error("Registration error:", error);
      toast({
        title: "Erreur d'inscription",
        description: error.message || "Impossible de créer un compte. Veuillez réessayer.",
        variant: "destructive",
      });
      throw error;
    }
  },

  resetPassword: async (email: string): Promise<void> => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) throw error;
      
      toast({
        title: "Email envoyé",
        description: "Si un compte existe avec cette adresse, un email de réinitialisation sera envoyé.",
      });
    } catch (error: any) {
      console.error("Reset password error:", error);
      toast({
        title: "Erreur",
        description: error.message || "Une erreur s'est produite. Veuillez réessayer.",
        variant: "destructive",
      });
      throw error;
    }
  },

  logout: async (): Promise<void> => {
    try {
      await supabase.auth.signOut();
      
      toast({
        title: "Déconnexion réussie",
        description: "Vous avez été déconnecté avec succès.",
      });
    } catch (error: any) {
      console.error("Logout error:", error);
      toast({
        title: "Erreur de déconnexion",
        description: error.message || "Impossible de se déconnecter. Veuillez réessayer.",
        variant: "destructive",
      });
      throw error;
    }
  }
};
