
import { User } from './types';
import * as authService from './authService';
import { toast } from '@/hooks/use-toast';

// Login function
export const handleLogin = async (
  email: string, 
  password: string, 
  setCurrentUser: (user: User) => void,
  setIsAuthenticated: (value: boolean) => void,
  setIsLoggingIn: (value: boolean) => void,
  callback?: () => void
) => {
  try {
    setIsLoggingIn(true);
    const user = await authService.loginUser(email, password);
    setCurrentUser(user);
    setIsAuthenticated(true);
    
    // Success toast
    toast({
      title: "Connexion réussie",
      description: `Bienvenue, ${user.name || user.email}!`,
    });
    
    if (callback) callback();
    return;
  } catch (error: any) {
    console.error("Login error:", error);
    // Error toast
    toast({
      title: "Erreur de connexion",
      description: error.message || "Vérifiez vos identifiants et réessayez.",
      variant: "destructive",
    });
    throw error;
  } finally {
    setIsLoggingIn(false);
  }
};

// Login with demo account
export const handleLoginWithDemo = async (
  account: any, 
  setCurrentUser: (user: User) => void,
  setIsAuthenticated: (value: boolean) => void,
  setIsLoggingIn: (value: boolean) => void,
  callback?: () => void
) => {
  try {
    setIsLoggingIn(true);
    const { email, password } = account;
    const user = await authService.loginUser(email, password);
    setCurrentUser(user);
    setIsAuthenticated(true);
    
    toast({
      title: "Connexion démo réussie",
      description: `Vous êtes connecté en tant que ${user.name || user.email} (${user.role}).`,
    });
    
    if (callback) callback();
    return;
  } catch (error: any) {
    console.error("Demo login error:", error);
    toast({
      title: "Erreur de connexion démo",
      description: error.message || "Un problème est survenu avec ce compte de démonstration.",
      variant: "destructive",
    });
    throw error;
  } finally {
    setIsLoggingIn(false);
  }
};

// Register function
export const handleRegister = async (
  email: string, 
  password: string, 
  name: string, 
  setCurrentUser: (user: User) => void,
  setIsAuthenticated: (value: boolean) => void,
  callback?: () => void
) => {
  try {
    const user = await authService.registerUser(name, email, password);
    setCurrentUser(user);
    setIsAuthenticated(true);
    
    toast({
      title: "Compte créé avec succès",
      description: "Bienvenue sur Schoolier!",
    });
    
    if (callback) callback();
    return;
  } catch (error: any) {
    console.error("Registration error:", error);
    toast({
      title: "Erreur d'inscription",
      description: error.message || "Impossible de créer votre compte. Veuillez réessayer.",
      variant: "destructive",
    });
    throw error;
  }
};

// Reset password
export const handleResetPassword = async (email: string) => {
  try {
    await authService.resetUserPassword(email);
    toast({
      title: "Email envoyé",
      description: "Si un compte existe avec cette adresse, vous recevrez un email de réinitialisation.",
    });
  } catch (error: any) {
    console.error("Password reset error:", error);
    toast({
      title: "Erreur de réinitialisation",
      description: error.message || "Impossible d'envoyer l'email de réinitialisation.",
      variant: "destructive",
    });
    throw error;
  }
};
