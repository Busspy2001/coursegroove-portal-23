
import { User } from './types';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { clearUserCache } from './authUtils';
import { DemoAccount } from '@/components/auth/demo/types';
import { isDemoAccount } from '@/components/auth/demo/demoAccountService';

// Login function with email/password
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
    
    // Check if it's a demo account
    if (isDemoAccount(email)) {
      console.log("🎭 Compte de démonstration détecté, utilisation d'un flux de connexion spécial");
      // Create a valid DemoAccount object with required fields
      const demoInfo = await getDemoAccountInfo(email);
      if (!demoInfo) {
        throw new Error("Demo account information not found");
      }
      
      const demoAccount: DemoAccount = {
        email,
        password,
        role: demoInfo.role,
        name: demoInfo.name,
        avatar: demoInfo.avatar
      };
      
      return handleLoginWithDemo(demoAccount, setCurrentUser, setIsAuthenticated, setIsLoggingIn, callback);
    }
    
    // Login with Supabase
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

    // Get user profile with role
    const { data: profile, error: profileError } = await supabase
      .from('profiles_unified')
      .select('*')
      .eq('id', data.user.id)
      .maybeSingle();

    if (profileError) {
      console.error("❌ Erreur lors de la récupération du profil:", profileError);
      // Continue anyway with limited user info
    }

    // Create user object
    const user: User = {
      id: data.user.id,
      email: data.user.email || "",
      name: profile?.full_name || "",
      role: profile?.role || "student",
      is_demo: profile?.is_demo || false,
      avatar: profile?.avatar_url,
      company_id: profile?.company_id
    };

    // Update authentication state
    setCurrentUser(user);
    setIsAuthenticated(true);
    
    // Execute success callback
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

// Helper function to get demo account info
async function getDemoAccountInfo(email: string): Promise<{role: any, name: string, avatar?: string} | null> {
  try {
    // First try import from the demoAccountService
    const { getDemoAccountInfo } = await import('@/components/auth/demo/demoAccountService');
    const demoInfo = getDemoAccountInfo(email);
    if (demoInfo) {
      return demoInfo;
    }
    
    // Fallback logic if the import doesn't work or returns no data
    if (email.includes('admin')) {
      return { role: 'super_admin', name: 'Admin Demo', avatar: '/avatars/admin.png' };
    } else if (email.includes('prof') || email.includes('instructor')) {
      return { role: 'instructor', name: 'Instructor Demo', avatar: '/avatars/instructor.png' };
    } else if (email.includes('business') || email.includes('entreprise')) {
      return { role: 'business_admin', name: 'Business Admin Demo', avatar: '/avatars/business.png' };
    } else if (email.includes('employee')) {
      return { role: 'employee', name: 'Employee Demo', avatar: '/avatars/employee.png' };
    } else {
      return { role: 'student', name: 'Student Demo', avatar: '/avatars/student.png' };
    }
  } catch (error) {
    console.error("Error getting demo account info:", error);
    return null;
  }
}

// Demo account login function
export const handleLoginWithDemo = async (
  account: DemoAccount,
  setCurrentUser: (user: User | null) => void,
  setIsAuthenticated: (isAuth: boolean) => void,
  setIsLoggingIn: (isLogging: boolean) => void,
  callback?: () => void
): Promise<User> => {
  try {
    console.log(`🎭 Connexion avec compte démo: ${account.email}`);

    // Login with Supabase
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

    // Create user object for demo account
    const user: User = {
      id: data.user.id,
      email: account.email,
      name: account.name,
      role: account.role,
      is_demo: true,
      avatar: account.avatar
    };

    // Update state
    setCurrentUser(user);
    setIsAuthenticated(true);
    
    // Execute callback
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

// Registration function
export const handleRegister = async (
  email: string,
  password: string,
  name: string,
  setCurrentUser: (user: User | null) => void,
  setIsAuthenticated: (isAuth: boolean) => void,
  callback?: () => void
): Promise<User> => {
  try {
    // Register with Supabase
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

    // Create user object
    const user: User = {
      id: data.user.id,
      email: data.user.email || "",
      name: name,
      role: "student", // By default, new users are students
      is_demo: false
    };

    // Update state
    setCurrentUser(user);
    setIsAuthenticated(true);
    
    // Execute callback
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

// Password reset function
export const handleResetPassword = async (email: string): Promise<void> => {
  try {
    // Send reset email
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
