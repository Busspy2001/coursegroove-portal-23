
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { DemoAccount } from "./types";

export async function createDemoAccount(account: DemoAccount) {
  try {
    // Check if account exists
    const { data: existingUser, error: checkError } = await supabase
      .from('profiles_unified')
      .select('*')
      .eq('email', account.email)
      .single();
    
    if (checkError && checkError.message !== 'No rows found') {
      console.error("Error checking if user exists:", checkError);
    }
    
    // Return true if account exists
    if (existingUser) {
      return true;
    }
    
    console.log(`Le compte ${account.role} n'existe pas. Création en cours...`);
    
    // Create auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: account.email,
      password: account.password,
      options: {
        data: {
          name: account.name,
        }
      }
    });
    
    if (authError) {
      throw authError;
    }
    
    // Wait a bit to ensure the account is created in Supabase
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Update the role directly in the database for admin accounts
    if (account.role === "admin" || account.role === "super_admin" || account.role === "business_admin") {
      // Get the user ID
      const { data: userData } = await supabase.auth.getUser();
      if (userData?.user) {
        console.log(`Mise à jour du rôle pour ${account.email} vers ${account.role}`);
        const { error: updateError } = await supabase
          .from('profiles_unified')
          .update({ role: account.role })
          .eq('id', userData.user.id);
          
        if (updateError) {
          console.error("Error updating user role:", updateError);
        } else {
          console.log(`Rôle mis à jour pour ${account.email}: ${account.role}`);
        }
      }
    }
    
    toast({
      title: "Compte créé avec succès",
      description: `Le compte ${account.name} a été créé.`,
    });
    
    return true;
  } catch (error: any) {
    console.error("Error creating demo account:", error);
    toast({
      title: "Erreur lors de la création du compte",
      description: error.message || "Une erreur s'est produite",
      variant: "destructive",
    });
    return false;
  }
}
