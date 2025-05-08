
import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { toast } from "@/hooks/use-toast";

type UserRole = "student" | "instructor" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  bio?: string;
}

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Map Supabase user to our User interface
  const mapSupabaseUser = async (supabaseUser: SupabaseUser | null): Promise<User | null> => {
    if (!supabaseUser) return null;
    
    // Get user profile from the profiles_unified table
    const { data: profile, error } = await supabase
      .from('profiles_unified')
      .select('*')
      .eq('id', supabaseUser.id)
      .single();
    
    if (error) {
      console.error("Error fetching user profile:", error);
      return {
        id: supabaseUser.id,
        email: supabaseUser.email || '',
        name: supabaseUser.user_metadata?.name || 'User',
        role: 'student', // Default role
        avatar: supabaseUser.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${supabaseUser.user_metadata?.name || 'User'}&background=0D9488&color=fff`
      };
    }
    
    return {
      id: supabaseUser.id,
      email: supabaseUser.email || '',
      name: profile?.full_name || supabaseUser.user_metadata?.name || 'User',
      role: (profile?.role as UserRole) || 'student',
      // Safely access avatar_url which might be missing in the type definition
      avatar: profile?.avatar_url || supabaseUser.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${profile?.full_name || 'User'}&background=0D9488&color=fff`,
      // Safely access bio which might be missing in the type definition
      bio: profile?.bio || ''
    };
  };

  // Check for existing session on mount
  useEffect(() => {
    const checkUser = async () => {
      setLoading(true);
      try {
        // Get the current session
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          const mappedUser = await mapSupabaseUser(session.user);
          setCurrentUser(mappedUser);
        }
      } catch (error) {
        console.error("Error checking auth session:", error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        const mappedUser = await mapSupabaseUser(session.user);
        setCurrentUser(mappedUser);
      } else if (event === 'SIGNED_OUT') {
        setCurrentUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      
      const mappedUser = await mapSupabaseUser(data.user);
      setCurrentUser(mappedUser);
      
      toast({
        title: "Connexion réussie",
        description: `Bienvenue, ${mappedUser?.name || 'utilisateur'}!`,
      });
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        title: "Erreur de connexion",
        description: error.message || "Impossible de se connecter. Veuillez réessayer.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
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
      
      if (data.user) {
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
        setCurrentUser(mappedUser);
        
        toast({
          title: "Inscription réussie",
          description: "Votre compte a été créé avec succès!",
        });
      }
    } catch (error: any) {
      console.error("Registration error:", error);
      toast({
        title: "Erreur d'inscription",
        description: error.message || "Impossible de créer un compte. Veuillez réessayer.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setCurrentUser(null);
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
    }
  };

  const value = {
    currentUser,
    loading,
    login,
    register,
    logout,
    isAuthenticated: currentUser !== null,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
