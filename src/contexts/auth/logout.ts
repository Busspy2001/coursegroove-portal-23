
import { logoutUser } from './authService';
import { clearUserCache } from './authUtils';
import { toast } from '@/hooks/use-toast';

// Timeout constants for logout process
export const LOGOUT_TIMEOUT = 5000; // 5 seconds timeout for logout
export const CACHE_CLEAR_DELAY = 100; // Small delay before cache clearing

// Flag to prevent navigation loops
let isLogoutInProgress = false;

// Function to reset the logout flag (useful for tests and error recovery)
export const resetLogoutStatus = () => {
  isLogoutInProgress = false;
};

// Improved logout function with timeout and better error handling
export const executeLogout = async (
  setCurrentUser: (user: any) => void,
  setIsAuthenticated: (value: boolean) => void,
  setIsLoggingOut: (value: boolean) => void,
  callback?: () => void
) => {
  console.log("🔄 Début du processus de déconnexion");
  
  // Prevent multiple logout attempts
  if (isLogoutInProgress) {
    console.log("⚠️ Déconnexion déjà en cours, ignorée");
    // Ensure we reset the loading state if we're ignoring the request
    setIsLoggingOut(false);
    return;
  }
  
  isLogoutInProgress = true;
  
  try {
    // First, clear any local user state before calling Supabase logout
    // This ensures UI is immediately responsive
    setCurrentUser(null);
    setIsAuthenticated(false);
    
    // Create a promise that will resolve when logout completes or timeout
    const logoutWithTimeout = async () => {
      let timeoutId: NodeJS.Timeout;
      
      // Create a promise that will resolve with the logout result or reject on timeout
      const logoutPromise = Promise.race([
        logoutUser().then(() => {
          console.log("✅ Déconnexion Supabase réussie");
          return true;
        }),
        new Promise<boolean>((_, reject) => {
          timeoutId = setTimeout(() => {
            console.warn("⚠️ Délai de déconnexion dépassé, forçage de la déconnexion");
            reject(new Error("Logout timeout"));
          }, LOGOUT_TIMEOUT);
        })
      ]);
      
      try {
        await logoutPromise;
      } catch (error) {
        console.error("⚠️ Erreur lors de la déconnexion, forçage de la fin de session:", error);
      } finally {
        clearTimeout(timeoutId);
        
        // Force delete local storage Supabase tokens - plus aggressif pour garantir la déconnexion
        try {
          // Vérifier tous les tokens potentiels et les supprimer
          const authToken = localStorage.getItem('sb-iigenwvxvvfoywrhbwms-auth-token');
          if (authToken) {
            console.log("🗑️ Suppression manuelle du token d'authentification");
            localStorage.removeItem('sb-iigenwvxvvfoywrhbwms-auth-token');
          }
          
          // Suppression plus agressive de tous les éléments qui pourraient contenir "auth"
          for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && (key.includes('auth') || key.includes('supabase'))) {
              console.log(`🗑️ Suppression de clé localStorage potentielle: ${key}`);
              localStorage.removeItem(key);
            }
          }
        } catch (e) {
          console.error("❌ Erreur lors de la suppression des tokens:", e);
        }
        
        // Clear cache after a small delay to ensure it doesn't interfere with logout
        setTimeout(() => {
          console.log("🗑️ Nettoyage du cache utilisateur post-déconnexion");
          clearUserCache();
        }, CACHE_CLEAR_DELAY);
        
        return true; // Always return success for UI purposes
      }
    };
    
    // Execute the logout with timeout
    await logoutWithTimeout();
    
    toast({
      title: "Déconnexion réussie",
      description: "Vous avez été déconnecté avec succès.",
    });
    
    // Execute callback with slight delay to ensure auth state is updated
    if (callback) {
      // Exécuter le callback avec un délai pour éviter des problèmes de synchronisation
      setTimeout(() => {
        callback();
      }, 100);
    }
  } catch (error: any) {
    console.error("❌ Erreur critique de déconnexion:", error);
    toast({
      title: "Erreur de déconnexion",
      description: error.message || "Un problème est survenu lors de la déconnexion.",
      variant: "destructive",
    });
    throw error;
  } finally {
    // Always ensure we reset the loading state, whether there was success or failure
    setIsLoggingOut(false);
    console.log("🔄 Processus de déconnexion terminé");
    
    // Reset the logout flag after a short delay
    setTimeout(() => {
      isLogoutInProgress = false;
      console.log("🔄 Flag de déconnexion réinitialisé");
    }, 500);
  }
};
