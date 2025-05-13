
import { Database } from "@/integrations/supabase/types";

// Définir UserRole pour correspondre au type dans la base de données
export type UserRole = Database['public']['Enums']['user_role'] | 'admin';

export interface DemoAccount {
  id: string;
  email: string;
  password: string;
  role: UserRole;
  name: string;
  avatar: string;
  description: string;
  features: string[];
}
