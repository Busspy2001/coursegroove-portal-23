
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

// Password reset handler
export const handleResetPassword = async (email: string): Promise<void> => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    
    if (error) {
      console.error("❌ Password reset failed:", error.message);
      toast({
        title: "Échec de réinitialisation",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
    
    toast({
      title: "Email envoyé",
      description: "Si un compte existe avec cet email, vous recevrez des instructions de réinitialisation.",
    });
  } catch (error) {
    throw error;
  }
};
