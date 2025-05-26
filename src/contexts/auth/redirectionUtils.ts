
import { User, UserRole } from './types';

// Centralized redirection logic for all user types
export const determineUserDashboard = (user: User | null): string => {
  if (!user) {
    console.log("🚫 No user provided, defaulting to /student");
    return "/student";
  }

  console.log("🎯 Determining dashboard for:", {
    email: user.email,
    roles: user.roles,
    is_demo: user.is_demo
  });

  const email = user.email?.toLowerCase() || '';
  const roles = user.roles || [];

  // Priority 1: Demo account email patterns with is_demo flag
  if (user.is_demo) {
    if (email.includes('prof') || email.includes('instructor')) {
      console.log("👨‍🏫 Demo instructor detected, redirecting to /instructor");
      return "/instructor";
    }
    
    if (email.includes('business') || email.includes('entreprise')) {
      console.log("🏢 Demo business admin detected, redirecting to /entreprise");
      return "/entreprise";
    }
    
    if (email.includes('admin')) {
      console.log("👑 Demo admin detected, redirecting to /admin");
      return "/admin";
    }
    
    if (email.includes('employee')) {
      console.log("👔 Demo employee detected, redirecting to /employee");
      return "/employee";
    }
    
    // Default demo fallback to student
    console.log("🎓 Demo account fallback to /student");
    return "/student";
  }

  // Priority 2: Role-based redirection for non-demo accounts
  if (roles.includes('super_admin') || roles.includes('admin')) {
    console.log("👑 Admin role detected, redirecting to /admin");
    return "/admin";
  }
  
  if (roles.includes('instructor')) {
    console.log("👨‍🏫 Instructor role detected, redirecting to /instructor");
    return "/instructor";
  }
  
  if (roles.includes('business_admin')) {
    console.log("🏢 Business admin role detected, redirecting to /entreprise");
    return "/entreprise";
  }
  
  if (roles.includes('employee')) {
    console.log("👔 Employee role detected, redirecting to /employee");
    return "/employee";
  }

  // Priority 3: Default fallback
  console.log("🎓 No specific role found, defaulting to /student");
  return "/student";
};

// Helper function to get role display information
export const getRoleInfo = (user: User | null) => {
  if (!user) return { role: 'student', displayName: 'Étudiant' };

  const email = user.email?.toLowerCase() || '';
  const roles = user.roles || [];

  // Demo account detection
  if (user.is_demo) {
    if (email.includes('prof') || email.includes('instructor')) {
      return { role: 'instructor', displayName: 'Instructeur' };
    }
    if (email.includes('business') || email.includes('entreprise')) {
      return { role: 'business_admin', displayName: 'Admin Entreprise' };
    }
    if (email.includes('admin')) {
      return { role: 'admin', displayName: 'Admin' };
    }
    if (email.includes('employee')) {
      return { role: 'employee', displayName: 'Employé' };
    }
  }

  // Role-based detection
  if (roles.includes('super_admin') || roles.includes('admin')) {
    return { role: 'admin', displayName: 'Admin' };
  }
  if (roles.includes('instructor')) {
    return { role: 'instructor', displayName: 'Instructeur' };
  }
  if (roles.includes('business_admin')) {
    return { role: 'business_admin', displayName: 'Admin Entreprise' };
  }
  if (roles.includes('employee')) {
    return { role: 'employee', displayName: 'Employé' };
  }

  return { role: 'student', displayName: 'Étudiant' };
};
