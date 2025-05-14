
export type UserRole = 
  | "super_admin" 
  | "business_admin" 
  | "instructor" 
  | "student"
  | "employee"
  | "admin"
  | "demo";

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
