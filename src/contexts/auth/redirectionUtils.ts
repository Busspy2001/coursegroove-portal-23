
import { User, UserRole } from './types';

// Enhanced demo instructor detection function
const isDemoInstructor = (user: User): boolean => {
  const email = user.email?.toLowerCase() || '';
  
  // Check multiple criteria for demo instructor
  return (user.is_demo || email.includes('@schoolier.com')) && 
         (email === 'prof@schoolier.com' || 
          email.includes('prof') || 
          email.includes('instructor') ||
          user.roles?.includes('instructor'));
};

// Enhanced demo business admin detection function  
const isDemoBusinessAdmin = (user: User): boolean => {
  const email = user.email?.toLowerCase() || '';
  
  return (user.is_demo || email.includes('@schoolier.com')) && 
         (email === 'business@schoolier.com' || 
          email === 'entreprise@schoolier.com' || 
          email.includes('business') || 
          email.includes('entreprise') ||
          user.roles?.includes('business_admin'));
};

// Enhanced demo admin detection function
const isDemoAdmin = (user: User): boolean => {
  const email = user.email?.toLowerCase() || '';
  
  return (user.is_demo || email.includes('@schoolier.com')) && 
         (email === 'admin@schoolier.com' || 
          email.includes('admin') ||
          user.roles?.includes('admin') || 
          user.roles?.includes('super_admin'));
};

// Enhanced demo employee detection function
const isDemoEmployee = (user: User): boolean => {
  const email = user.email?.toLowerCase() || '';
  
  return (user.is_demo || email.includes('@schoolier.com')) && 
         (email === 'employee@schoolier.com' || 
          email.includes('employee') ||
          user.roles?.includes('employee'));
};

// Centralized redirection logic for all user types with enhanced demo support
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

  // Priority 1: Enhanced demo account detection with specific functions
  if (user.is_demo || user.email?.toLowerCase().includes('@schoolier.com')) {
    console.log("🎭 Demo account detected, using enhanced detection functions");
    
    if (isDemoInstructor(user)) {
      console.log("👨‍🏫 Demo instructor detected, redirecting to /instructor");
      return "/instructor";
    }
    
    if (isDemoBusinessAdmin(user)) {
      console.log("🏢 Demo business admin detected, redirecting to /entreprise");
      return "/entreprise";
    }
    
    if (isDemoAdmin(user)) {
      console.log("👑 Demo admin detected, redirecting to /admin");
      return "/admin";
    }
    
    if (isDemoEmployee(user)) {
      console.log("👔 Demo employee detected, redirecting to /employee");
      return "/employee";
    }
    
    // Default demo fallback to student
    console.log("🎓 Demo account fallback to /student");
    return "/student";
  }

  // Priority 2: Role-based redirection for non-demo accounts
  const roles = user.roles || [];
  
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

// Enhanced helper function to get role display information with demo priority
export const getRoleInfo = (user: User | null) => {
  if (!user) return { role: 'student', displayName: 'Étudiant' };

  // Demo account detection with enhanced logic
  if (user.is_demo || user.email?.toLowerCase().includes('@schoolier.com')) {
    if (isDemoInstructor(user)) {
      return { role: 'instructor', displayName: 'Instructeur' };
    }
    if (isDemoBusinessAdmin(user)) {
      return { role: 'business_admin', displayName: 'Admin Entreprise' };
    }
    if (isDemoAdmin(user)) {
      return { role: 'admin', displayName: 'Admin' };
    }
    if (isDemoEmployee(user)) {
      return { role: 'employee', displayName: 'Employé' };
    }
  }

  // Role-based detection for non-demo accounts
  const roles = user.roles || [];
  
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
