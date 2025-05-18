
import { UserRole } from "@/contexts/auth/types";

export interface DemoAccount {
  email: string;
  password: string;
  role: UserRole;
  name: string;
  avatar?: string;
  description?: string;
  id?: string; // Make ID optional since we might not have it at first
  features?: string[];
}
