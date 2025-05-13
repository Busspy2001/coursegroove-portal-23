
import { Database } from "@/integrations/supabase/types";

// Réutiliser le type d'énumération défini dans la base de données
// et ajouter une valeur 'admin' supplémentaire pour la compatibilité
export type UserRole = Database['public']['Enums']['user_role'] | 'admin';

export interface User {
  id: string;
  email: string;
  name?: string;
  role: UserRole;
  avatar?: string;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isLoggingIn: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<User>;
  register: (name: string, email: string, password: string, isDemoAccount?: boolean) => Promise<User>;
  resetPassword: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  loginWithDemo: (email: string, password: string) => Promise<User>;
}
