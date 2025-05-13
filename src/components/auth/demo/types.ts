
import { UserRole } from "@/contexts/auth/types";

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
