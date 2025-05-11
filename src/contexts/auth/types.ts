
export type UserRole = 'student' | 'instructor' | 'admin' | 'business_admin' | 'demo';

export interface User {
  id: string;
  email: string;
  name?: string;
  role: UserRole;
  avatar?: string;
  bio?: string;
  phone?: string; // Adding phone property to the User interface
}

export interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (name: string, email: string, password: string, isDemoAccount?: boolean) => Promise<User>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  isAuthenticated: boolean;
}
