import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Briefcase, Building2, Plus, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/auth";
import { ensureDemoAccountsExist } from "@/components/auth/demo/initDemoAccounts";
import { toast } from "@/hooks/use-toast";

interface NoCompanyMessageProps {
  onNavigate: (path: string) => void;
  isDemoUser?: boolean;
  onCompanyCreated?: () => void;
}

export const NoCompanyMessage: React.FC<NoCompanyMessageProps> = ({ 
  onNavigate,
  isDemoUser = false,
  onCompanyCreated
}) => {
  const [isCreating, setIsCreating] = useState(false);
  const { currentUser } = useAuth();
  
  const createDemoCompany = async () => {
    if (!currentUser?.id) {
      toast({
        title: "Erreur",
        description: "Utilisateur non authentifié",
        variant: "destructive",
      });
      return;
    }
    
    setIsCreating(true);
    try {
      // Ensure demo accounts exist first
      await ensureDemoAccountsExist();
      
      // Check if user already has a company
      const { data: existingCompany } = await supabase
        .from('companies')
        .select('id')
        .eq('admin_id', currentUser.id)
        .maybeSingle();
        
      let companyId = existingCompany?.id;
        
      if (!companyId) {
        // Create a new company 
        const { data: newCompany, error: companyError } = await supabase
          .from('companies')
          .insert({
            name: `Entreprise de ${currentUser.name || 'Démonstration'}`,
            admin_id: currentUser.id
          })
          .select('id')
          .single();
          
        if (companyError) {
          throw new Error(`Erreur lors de la création de l'entreprise: ${companyError.message}`);
        }
        
        companyId = newCompany.id;
        
        // Update user with company_id
        await supabase
          .from('profiles_unified')
          .update({ company_id: companyId })
          .eq('id', currentUser.id);
          
        // Create departments
        const departments = [
          { name: 'Marketing', description: 'Département marketing' },
          { name: 'IT', description: 'Département informatique' },
          { name: 'RH', description: 'Ressources Humaines' }
        ];
        
        for (const dept of departments) {
          await supabase
            .from('company_departments')
            .insert({
              name: dept.name,
              description: dept.description,
              company_id: companyId,
              position: departments.indexOf(dept) + 1
            });
        }
      }
      
      toast({
        title: "Entreprise créée",
        description: "Votre entreprise de démonstration a été créée avec succès.",
      });
      
      // Call onCompanyCreated callback if provided
      if (onCompanyCreated) {
        onCompanyCreated();
      } else {
        // Otherwise reload the page
        window.location.reload();
      }
    } catch (error) {
      console.error("Erreur lors de la création de l'entreprise de démonstration:", error);
      toast({
        title: "Erreur",
        description: "Impossible de créer l'entreprise de démonstration. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 space-y-4">
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 max-w-lg w-full text-center space-y-4">
        <div className="mx-auto bg-amber-100 rounded-full p-3 w-fit">
          <Briefcase className="h-8 w-8 text-amber-600" />
        </div>
        <h2 className="text-xl font-semibold text-amber-800">Aucune entreprise associée</h2>
        <p className="text-amber-700">
          {isDemoUser 
            ? "En tant qu'utilisateur de démonstration, vous pouvez créer une entreprise fictive pour explorer toutes les fonctionnalités."
            : "Vous n'avez pas encore d'entreprise configurée dans votre compte. Veuillez contacter un administrateur pour configurer votre espace entreprise."}
        </p>
        <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
          {isDemoUser ? (
            <Button 
              onClick={createDemoCompany} 
              className="w-full sm:w-auto"
              disabled={isCreating}
            >
              {isCreating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Création en cours...
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Créer une entreprise démo
                </>
              )}
            </Button>
          ) : (
            <>
              <Button variant="outline" onClick={() => onNavigate("/contact")}>
                Contacter le support
              </Button>
              <Button onClick={() => onNavigate("/entreprise/parametres/entreprise")} className="w-full sm:w-auto">
                <Building2 className="mr-2 h-4 w-4" />
                Configurer mon entreprise
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
