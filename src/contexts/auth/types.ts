
export type UserRole = "student" | "instructor" | "admin" | "super_admin" | "business_admin";

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: UserRole;
  bio?: string;
  phone?: string;
  company_id?: string;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  currentUser: User | null;
  isLoading: boolean;
  isLoggingOut: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, isDemoAccount?: boolean) => Promise<User>;
  logout: (callback?: () => void) => Promise<void>;
  updateUserProfile: (updatedProfile: Partial<User>) => Promise<void>;
  loginWithDemo: (role: UserRole) => Promise<void>;
}
