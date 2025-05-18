
import { demoAccounts, DemoAccount } from './initDemoAccounts';

// Check if an email belongs to a demo account
export const isDemoAccount = (email: string): boolean => {
  if (!email) return false;
  return demoAccounts.some(account => account.email.toLowerCase() === email.toLowerCase());
};

// Get demo account info by email
export const getDemoAccountInfo = (email: string): DemoAccount | null => {
  if (!email) return null;
  return demoAccounts.find(account => account.email.toLowerCase() === email.toLowerCase()) || null;
};

// Get all demo accounts for a specific role
export const getDemoAccountsByRole = (role: string): DemoAccount[] => {
  return demoAccounts.filter(account => account.role === role);
};

// Get first demo account for a specific role
export const getFirstDemoAccountByRole = (role: string): DemoAccount | null => {
  return demoAccounts.find(account => account.role === role) || null;
};

// Get a list of available demo roles
export const getAvailableDemoRoles = (): string[] => {
  const roles = demoAccounts.map(account => account.role);
  return [...new Set(roles)]; // Remove duplicates
};
