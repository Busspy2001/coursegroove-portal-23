
import { UserRole } from "@/contexts/auth/types";

export interface DemoAccount {
  email: string;
  password: string;
  role: UserRole;
  name: string;
}

export const demoAccounts: DemoAccount[] = [
  {
    email: "student@schoolier.com",
    password: "password123",
    role: "student",
    name: "Etudiant Démo"
  },
  {
    email: "instructor@schoolier.com",
    password: "password123",
    role: "instructor",
    name: "Professeur Démo"
  },
  {
    email: "admin@schoolier.com",
    password: "password123",
    role: "admin", // This should be of type UserRole
    name: "Administrateur Démo"
  }
];
