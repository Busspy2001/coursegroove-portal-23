
import { supabase } from "@/integrations/supabase/client";
import { getDemoAccounts } from "./demoAccountService";
import { toast } from "@/hooks/use-toast";

/**
 * Crée ou met à jour les comptes de démonstration dans la base de données Supabase
 * Cette fonction s'assure que les comptes démo sont toujours disponibles
 */
export const initDemoAccounts = async (): Promise<boolean> => {
  try {
    console.log("🚀 Initialisation des comptes démo...");
    const demoAccounts = getDemoAccounts();
    let success = true;

    // Vérifier d'abord la connexion à Supabase
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      console.log("⏭️ L'utilisateur est déjà connecté, pas besoin d'initialiser les comptes démo");
      return true;
    }

    // Créer ou mettre à jour chaque compte démo
    for (const account of demoAccounts) {
      try {
        // Vérifier si le compte existe déjà via l'API auth
        const { data: existingUser, error: authError } = await supabase.auth.admin.listUsers();
        
        // Si on ne peut pas accéder à l'API admin (c'est normal), on vérifie dans la table profiles_unified
        if (authError) {
          console.log("ℹ️ Impossible d'utiliser listUsers, vérification via profiles_unified");
          const { data: profiles, error: profileError } = await supabase
            .from('profiles_unified')
            .select('email, is_demo')
            .eq('email', account.email)
            .eq('is_demo', true)
            .limit(1);
            
          const userExists = profiles && profiles.length > 0;
          
          if (userExists) {
            console.log(`ℹ️ Le compte démo ${account.email} existe déjà`);
            continue;
          }
        } else {
          // Si on a pu accéder à listUsers, on vérifie là-dedans
          // Utilisation de type casting pour résoudre le problème de typage
          interface UserObject {
            email?: string;
          }
          
          const users = existingUser?.users as UserObject[] | undefined;
          const userExists = users?.some(user => user.email === account.email);
          
          if (userExists) {
            console.log(`ℹ️ Le compte démo ${account.email} existe déjà`);
            continue;
          }
        }

        // Si le compte n'existe pas, on le crée
        console.log(`➕ Création du compte démo: ${account.email} (${account.role})`);
        
        // Créer le compte via signUp
        const { data, error } = await supabase.auth.signUp({
          email: account.email,
          password: account.password,
          options: {
            data: {
              name: account.name,
              full_name: account.name,
              role: account.role,
              avatar_url: account.avatar,
              is_demo: true
            }
          }
        });

        if (error) {
          console.error(`❌ Erreur lors de la création du compte démo ${account.email}:`, error);
          success = false;
          continue;
        }

        console.log(`✅ Compte démo créé pour ${account.email}`);
      } catch (error) {
        console.error(`❌ Erreur lors du traitement du compte ${account.email}:`, error);
        success = false;
      }
    }

    console.log(`✅ Initialisation des comptes démo ${success ? 'réussie' : 'partiellement réussie'}`);
    return success;
  } catch (error) {
    console.error("❌ Erreur lors de l'initialisation des comptes démo:", error);
    return false;
  }
};

/**
 * Appelle initDemoAccounts avec gestion des erreurs et notification
 * Cette version est modifiée pour ne pas essayer d'auto-connecter les comptes démo
 */
export const ensureDemoAccountsExist = async (silent: boolean = true): Promise<void> => {
  try {
    // First check if user is already logged in - don't create accounts if so
    const { data: { session } } = await supabase.auth.getSession();
    
    // Only initialize demo accounts if we're on the login or register page
    // This prevents auto-initialization on page refresh after logout
    const isAuthPage = window.location.pathname.includes('/login') || 
                       window.location.pathname.includes('/register');
    
    if (!session && isAuthPage) {
      const success = await initDemoAccounts();
      
      if (!silent) {
        if (success) {
          toast({
            title: "Comptes démo initialisés",
            description: "Les comptes de démonstration sont prêts à être utilisés.",
          });
        } else {
          toast({
            title: "Initialisation partielle",
            description: "Certains comptes démo n'ont pas pu être initialisés.",
            variant: "destructive",
          });
        }
      }
    } else {
      console.log("⏭️ Initialisation des comptes démo ignorée - utilisateur déjà connecté ou page non pertinente");
    }
  } catch (error) {
    console.error("Erreur lors de l'initialisation des comptes démo:", error);
    if (!silent) {
      toast({
        title: "Erreur d'initialisation",
        description: "Impossible d'initialiser les comptes démo.",
        variant: "destructive",
      });
    }
  }
};
