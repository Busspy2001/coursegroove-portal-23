
import { supabase } from "@/integrations/supabase/client";
import { getDemoAccounts } from "./demoAccountService";
import { toast } from "@/hooks/use-toast";
import { DemoAccount } from "./types";

/**
 * Crée ou met à jour les comptes de démonstration dans la base de données Supabase
 * Cette fonction s'assure que les comptes démo sont toujours disponibles
 */
export const initDemoAccounts = async (): Promise<boolean> => {
  try {
    console.log("🚀 Initialisation des comptes démo...");
    const demoAccounts = getDemoAccounts();
    let success = true;

    // Créer ou mettre à jour chaque compte démo
    for (const account of demoAccounts) {
      try {
        // Vérifier si le compte existe déjà
        const { data: existingUsers } = await supabase.auth.admin.listUsers();
        
        // Add explicit type assertion to help TypeScript understand the structure
        type SupabaseUser = { id: string; email?: string | null; user_metadata?: Record<string, any> };
        const users = existingUsers?.users as SupabaseUser[] | undefined;
        
        const userExists = users && users.some(user => 
          typeof user.email === 'string' && user.email === account.email
        );

        if (!userExists) {
          console.log(`➕ Création du compte démo: ${account.email} (${account.role})`);
          
          // Créer le compte
          const { data, error } = await supabase.auth.signUp({
            email: account.email,
            password: account.password,
            options: {
              data: {
                name: account.name,
                is_demo: true
              }
            }
          });

          if (error) {
            console.error(`❌ Erreur lors de la création du compte démo ${account.email}:`, error);
            success = false;
            continue;
          }

          // S'assurer que le profil est créé avec le bon rôle
          if (data.user) {
            // Convertir le rôle pour être compatible avec les types Supabase
            const dbRole = account.role === 'admin' ? 'super_admin' : account.role;

            // Insérer ou mettre à jour le profil dans profiles_unified
            const { error: profileError } = await supabase
              .from('profiles_unified')
              .upsert({
                id: data.user.id,
                full_name: account.name,
                email: account.email,
                role: dbRole,
                avatar_url: account.avatar,
                is_demo: true,
                created_at: new Date().toISOString()
              } as any);

            if (profileError) {
              console.error(`❌ Erreur lors de la création du profil pour ${account.email}:`, profileError);
              success = false;
            } else {
              console.log(`✅ Profil créé pour ${account.email}`);
            }
          }
        } else {
          console.log(`ℹ️ Le compte démo ${account.email} existe déjà`);
          
          // Trouver l'utilisateur dans la liste des utilisateurs au lieu d'utiliser getUserByEmail
          const user = users && users.find(u => 
            typeof u.email === 'string' && u.email === account.email
          );
          
          if (user) {
            // Convertir le rôle pour être compatible avec les types Supabase
            const dbRole = account.role === 'admin' ? 'super_admin' : account.role;

            // Mettre à jour le profil pour s'assurer que le rôle est correct
            const { error: profileError } = await supabase
              .from('profiles_unified')
              .upsert({
                id: user.id,
                full_name: account.name,
                email: account.email,
                role: dbRole,
                avatar_url: account.avatar,
                is_demo: true
              } as any);

            if (profileError) {
              console.error(`❌ Erreur lors de la mise à jour du profil pour ${account.email}:`, profileError);
              success = false;
            } else {
              console.log(`✅ Profil mis à jour pour ${account.email}`);
            }
          }
        }
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
