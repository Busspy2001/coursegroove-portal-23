
import { User } from './types';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { clearUserCache } from './authUtils';
import { DemoAccount } from '@/components/auth/demo/types';
import { isDemoAccount } from '@/components/auth/demo/demoAccountService';

// Fonction de connexion avec email/password
export const handleLogin = async (
  email: string,
  password: string,
  setCurrentUser: (user: User | null) => void,
  setIsAuthenticated: (isAuth: boolean) => void,
  setIsLoggingIn: (isLogging: boolean) => void,
  callback?: () => void
): Promise<User> => {
  try {
    console.log(`🔑 Tentative de connexion pour: ${email}`);
    
    // Vérifier si c'est un compte de démonstration
    if (isDemoAccount(email)) {
      console.log("🎭 Compte de démonstration détecté, utilisation d'un flux de connexion spécial");
      const demoAccount = { email, password };
      return handleLoginWithDemo(demoAccount, setCurrentUser, setIsAuthenticated, setIsLoggingIn, callback);
    }
    
    // Connexion avec Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("❌ Erreur de connexion:", error.message);
      throw new Error(error.message);
    }

    if (!data || !data.user) {
      console.error("❌ Erreur: Données utilisateur manquantes");
      throw new Error("Une erreur s'est produite lors de la connexion.");
    }

    // Récupérer le profil utilisateur avec le rôle
    const { data: profile, error: profileError } = await supabase
      .from('profiles_unified')
      .select('*')
      .eq('id', data.user.id)
      .maybeSingle();

    if (profileError) {
      console.error("❌ Erreur lors de la récupération du profil:", profileError);
      // Continue anyway with limited user info
    }

    // Créer l'objet utilisateur
    const user: User = {
      id: data.user.id,
      email: data.user.email || "",
      name: profile?.full_name || "",
      role: profile?.role || "student",
      is_demo: profile?.is_demo || false,
      avatar: profile?.avatar_url,
      company_id: profile?.company_id
    };

    // Mettre à jour l'état de l'authentification
    setCurrentUser(user);
    setIsAuthenticated(true);
    
    // Exécuter le callback de réussite
    if (callback) {
      callback();
    }

    console.log(`✅ Connexion réussie pour: ${email} (${user.role})`);
    return user;

  } catch (error) {
    console.error("❌ Erreur de connexion:", error);
    throw error;
  } finally {
    setIsLoggingIn(false);
  }
};

// Fonction de connexion avec un compte démo
export const handleLoginWithDemo = async (
  account: DemoAccount,
  setCurrentUser: (user: User | null) => void,
  setIsAuthenticated: (isAuth: boolean) => void,
  setIsLoggingIn: (isLogging: boolean) => void,
  callback?: () => void
): Promise<User> => {
  try {
    console.log(`🎭 Connexion avec compte démo: ${account.email}`);

    // Connexion avec Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email: account.email,
      password: account.password,
    });

    if (error) {
      console.error(`❌ Erreur de connexion démo (${account.email}):`, error.message);
      throw new Error(error.message);
    }

    if (!data || !data.user) {
      console.error("❌ Données utilisateur manquantes");
      throw new Error("Une erreur s'est produite lors de la connexion.");
    }

    // Créer l'objet utilisateur pour le compte de démo
    const user: User = {
      id: data.user.id,
      email: account.email,
      name: account.name,
      role: account.role,
      is_demo: true,
      avatar: account.avatar
    };

    // Mettre à jour l'état
    setCurrentUser(user);
    setIsAuthenticated(true);
    
    // Exécuter le callback
    if (callback) {
      callback();
    }

    console.log(`✅ Connexion démo réussie pour: ${account.email} (${account.role})`);
    
    toast({
      title: "Connexion démo réussie",
      description: `Connecté en tant que ${account.name} (${account.role})`,
    });

    return user;
  } catch (error) {
    console.error("❌ Erreur de connexion démo:", error);
    throw error;
  } finally {
    setIsLoggingIn(false);
  }
};

// Fonction d'inscription
export const handleRegister = async (
  email: string,
  password: string,
  name: string,
  setCurrentUser: (user: User | null) => void,
  setIsAuthenticated: (isAuth: boolean) => void,
  callback?: () => void
): Promise<User> => {
  try {
    // Inscription avec Supabase
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        }
      }
    });

    if (error) {
      console.error("❌ Erreur d'inscription:", error.message);
      throw new Error(error.message);
    }

    if (!data || !data.user) {
      console.error("❌ Données utilisateur manquantes");
      throw new Error("Une erreur s'est produite lors de l'inscription.");
    }

    // Créer l'objet utilisateur
    const user: User = {
      id: data.user.id,
      email: data.user.email || "",
      name: name,
      role: "student", // Par défaut, un nouvel utilisateur est un étudiant
      is_demo: false
    };

    // Mettre à jour l'état
    setCurrentUser(user);
    setIsAuthenticated(true);
    
    // Exécuter le callback
    if (callback) {
      callback();
    }

    console.log(`✅ Inscription réussie pour: ${email}`);
    return user;

  } catch (error) {
    console.error("❌ Erreur d'inscription:", error);
    throw error;
  }
};

// Fonction de réinitialisation de mot de passe
export const handleResetPassword = async (email: string): Promise<void> => {
  try {
    // Envoyer un email de réinitialisation
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + '/reset-password',
    });

    if (error) {
      console.error("❌ Erreur de réinitialisation:", error.message);
      throw new Error(error.message);
    }

    console.log(`📧 Email de réinitialisation envoyé à: ${email}`);
  } catch (error) {
    console.error("❌ Erreur de réinitialisation:", error);
    throw error;
  }
};
