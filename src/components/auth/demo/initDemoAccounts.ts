
import { supabase } from "@/integrations/supabase/client";
import { UserRole } from "@/contexts/auth/types";

export interface DemoAccount {
  email: string;
  password: string;
  role: UserRole;
  name: string;
  avatar?: string;
  description?: string;
  id?: string;
  features?: string[];
}

// List of demo accounts
export const demoAccounts: DemoAccount[] = [
  {
    email: "etudiant@schoolier.com",
    password: "demo123",
    role: "student",
    name: "Marie Martin",
    description: "Compte étudiant",
    features: [
      "Accès à tous les cours en ligne",
      "Suivi de progression personnalisé",
      "Forums d'entraide entre étudiants",
      "Certificats de réussite"
    ]
  },
  {
    email: "prof@schoolier.com",
    password: "demo123",
    role: "instructor",
    name: "Jean Dupont",
    description: "Compte formateur",
    features: [
      "Création et gestion de cours",
      "Tableau de bord des statistiques",
      "Gestion des étudiants inscrits",
      "Outils de communication et feedback"
    ]
  },
  {
    email: "admin@schoolier.com",
    password: "demo123",
    role: "admin",
    name: "Admin Système",
    description: "Compte administrateur",
    features: [
      "Administration complète de la plateforme",
      "Gestion des utilisateurs et permissions",
      "Statistiques et rapports avancés",
      "Configuration système et maintenance"
    ]
  },
  {
    email: "entreprise@schoolier.com",
    password: "demo123",
    role: "business_admin",
    name: "Thomas Durand",
    description: "Compte entreprise",
    features: [
      "Administration des groupes d'employés",
      "Assignation de formations",
      "Suivi de progression des équipes",
      "Rapports analytiques avancés"
    ]
  },
  {
    email: "business@schoolier.com",
    password: "demo123",
    role: "business_admin",
    name: "Sophie Leroy",
    description: "Compte entreprise",
    features: [
      "Administration des groupes d'employés",
      "Assignation de formations",
      "Suivi de progression des équipes",
      "Rapports analytiques avancés"
    ]
  },
  {
    email: "employee@schoolier.com",
    password: "demo123",
    role: "employee",
    name: "Pierre Martin",
    description: "Compte employé",
    features: [
      "Accès aux formations assignées",
      "Suivi de progression personnalisé",
      "Certificats de compétences",
      "Communication avec les formateurs"
    ]
  }
];

// Variable to prevent multiple simultaneous initializations
let isInitializing = false;
let initializationPromise: Promise<void> | null = null;

export const isDemoAccount = (email: string): boolean => {
  if (!email) return false;
  return demoAccounts.some(account => account.email.toLowerCase() === email.toLowerCase());
};

// Get demo account info by email
export const getDemoAccountInfo = (email: string): DemoAccount | null => {
  if (!email) return null;
  return demoAccounts.find(account => account.email.toLowerCase() === email.toLowerCase()) || null;
};

// Enhanced function to ensure user roles exist in user_roles table
const ensureUserRoleExists = async (userId: string, role: UserRole): Promise<void> => {
  try {
    // Check if role already exists in user_roles
    const { data: existingRole, error: checkError } = await supabase
      .from('user_roles')
      .select('id')
      .eq('user_id', userId)
      .eq('role', role)
      .maybeSingle();
      
    if (checkError) {
      console.error(`Error checking existing role for ${userId}:`, checkError);
      return;
    }
    
    // If role doesn't exist, create it
    if (!existingRole) {
      const { error: insertError } = await supabase
        .from('user_roles')
        .insert({
          user_id: userId,
          role: role
        });
        
      if (insertError) {
        console.error(`Error creating role ${role} for user ${userId}:`, insertError);
      } else {
        console.log(`✅ Created role ${role} for user ${userId}`);
      }
    } else {
      console.log(`Role ${role} already exists for user ${userId}`);
    }
  } catch (error) {
    console.error(`Error ensuring role exists for ${userId}:`, error);
  }
};

// Make sure the demo accounts exist in the database
export const ensureDemoAccountsExist = async (): Promise<void> => {
  // If initialization is already in progress, return the existing promise
  if (isInitializing && initializationPromise) {
    console.log("Initialization already in progress, reusing existing promise");
    return initializationPromise;
  }

  isInitializing = true;
  
  // Create a new initialization promise
  initializationPromise = (async () => {
    try {
      console.log("Starting demo accounts initialization...");
      
      for (const account of demoAccounts) {
        try {
          // Check if account exists with non-recursive query to avoid infinite loops
          const { data: existingUser, error: queryError } = await supabase
            .from('profiles_unified')
            .select('id, email, role, is_demo')
            .eq('email', account.email)
            .maybeSingle();
            
          if (queryError) {
            console.error(`Error checking existing user for ${account.email}:`, queryError);
            continue;
          }

          let userId: string;

          // If account doesn't exist, create it
          if (!existingUser) {
            console.log(`Creating demo account for ${account.email}`);
            
            // Generate a deterministic UUID from the email to avoid duplicates across retries
            const tempId = crypto.randomUUID();
            
            // Create entry in profiles_unified
            const { data, error } = await supabase
              .from('profiles_unified')
              .insert({
                id: tempId,
                email: account.email,
                full_name: account.name,
                role: account.role as UserRole,
                is_demo: true,
                avatar_url: account.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(account.name)}&background=0D9488&color=fff`
              })
              .select();
              
            if (error) {
              console.error(`Error creating demo account for ${account.email}:`, error);
              continue;
            }
            
            if (!data || !data[0]) {
              console.error(`No data returned when creating demo account for ${account.email}`);
              continue;
            }
            
            userId = data[0].id;
            console.log(`Demo account created for ${account.email} with ID: ${userId}`);
          } else {
            userId = existingUser.id;
            console.log(`Demo account for ${account.email} already exists (ID: ${userId})`);
            
            // Update the existing account if needed
            if (!existingUser.is_demo || existingUser.role !== account.role) {
              await supabase
                .from('profiles_unified')
                .update({
                  is_demo: true,
                  role: account.role as UserRole
                })
                .eq('id', existingUser.id);
                
              console.log(`Updated demo status for ${account.email}`);
            }
          }
          
          // Ensure the role exists in user_roles table
          await ensureUserRoleExists(userId, account.role);
          
          // Handle business-specific setup
          if (account.role === 'business_admin') {
            await createCompanyForDemoUser(userId, account.name);
          }
          
        } catch (error) {
          console.error(`Error processing demo account ${account.email}:`, error);
        }
      }
      
      // Ensure employee@schoolier.com is associated with a company
      await associateEmployeeWithCompany();
      console.log("Demo account initialization completed successfully");
      
    } catch (error) {
      console.error("Error ensuring demo accounts exist:", error);
    } finally {
      isInitializing = false;
    }
  })();
  
  return initializationPromise;
};

// Create a company for a business admin demo user
const createCompanyForDemoUser = async (userId: string, userName: string) => {
  try {
    // First check if user already has a company
    const { data: existingCompany } = await supabase
      .from('companies')
      .select('id')
      .eq('admin_id', userId)
      .maybeSingle();
      
    if (existingCompany) {
      console.log(`User ${userId} already has company ${existingCompany.id}`);
      return existingCompany.id;
    }
    
    // Create new company if none exists
    const { data: companyData, error: companyError } = await supabase
      .from('companies')
      .insert({
        name: `Entreprise de ${userName}`,
        admin_id: userId
      })
      .select();
      
    if (companyError) {
      console.error(`Error creating company for user ${userId}:`, companyError);
      return null;
    }
    
    if (companyData && companyData[0]) {
      const companyId = companyData[0].id;
      
      // Update the user with the company ID
      await supabase
        .from('profiles_unified')
        .update({ company_id: companyId })
        .eq('id', userId);
        
      // Create sample departments
      await createSampleDepartments(companyId);
      
      return companyId;
    }
    
    return null;
  } catch (error) {
    console.error(`Error creating company for user ${userId}:`, error);
    return null;
  }
};

// Ensure a business admin has a company
const ensureCompanyForBusinessAdmin = async (userId: string, userName: string) => {
  try {
    // Check if user already has company_id in their profile
    const { data: userProfile } = await supabase
      .from('profiles_unified')
      .select('company_id')
      .eq('id', userId)
      .single();
      
    if (userProfile?.company_id) {
      // Verify the company exists
      const { data: existingCompany } = await supabase
        .from('companies')
        .select('id')
        .eq('id', userProfile.company_id)
        .maybeSingle();
        
      if (existingCompany) {
        console.log(`Business admin ${userId} already has company ${existingCompany.id}`);
        return existingCompany.id;
      }
    }
    
    // If no valid company found, create a new one
    return await createCompanyForDemoUser(userId, userName);
    
  } catch (error) {
    console.error(`Error ensuring company for business admin ${userId}:`, error);
    return null;
  }
};

// Create sample departments for a company
const createSampleDepartments = async (companyId: string) => {
  try {
    // Check if departments already exist for this company
    const { data: existingDepts, error: deptCheckError } = await supabase
      .from('company_departments')
      .select('id')
      .eq('company_id', companyId);
      
    if (deptCheckError) {
      console.error(`Error checking existing departments for company ${companyId}:`, deptCheckError);
      return;
    }
    
    // Skip if departments already exist
    if (existingDepts && existingDepts.length > 0) {
      console.log(`Company ${companyId} already has ${existingDepts.length} departments`);
      return;
    }
    
    // Create departments
    const departments = [
      { name: 'Marketing', description: 'Département marketing' },
      { name: 'IT', description: 'Département informatique' },
      { name: 'RH', description: 'Ressources Humaines' }
    ];
    
    for (const dept of departments) {
      await supabase
        .from('company_departments')
        .insert({
          name: dept.name,
          description: dept.description,
          company_id: companyId,
          position: departments.indexOf(dept) + 1
        });
    }
    
    console.log(`Created ${departments.length} departments for company ${companyId}`);
  } catch (error) {
    console.error(`Error creating departments for company ${companyId}:`, error);
  }
};

// Helper function to associate the employee demo account with a company
const associateEmployeeWithCompany = async () => {
  try {
    // Get the employee account
    const { data: employee } = await supabase
      .from('profiles_unified')
      .select('id, company_id')
      .eq('email', 'employee@schoolier.com')
      .maybeSingle();
      
    if (!employee) {
      console.log("Employee demo account not found");
      return;
    }
    
    // If employee already has a company, check if it's valid
    if (employee.company_id) {
      const { data: companyCheck } = await supabase
        .from('companies')
        .select('id')
        .eq('id', employee.company_id)
        .maybeSingle();
        
      if (companyCheck) {
        // Employee already has a valid company
        console.log(`Employee already associated with company ${employee.company_id}`);
        await ensureEmployeeInCompany(employee.id, employee.company_id);
        return;
      }
    }
    
    // Get a business admin account
    const { data: businessAdmin } = await supabase
      .from('profiles_unified')
      .select('id, company_id')
      .eq('email', 'business@schoolier.com')
      .maybeSingle();
      
    if (!businessAdmin || !businessAdmin.company_id) {
      console.log("Could not find business admin account or company to associate employee with");
      return;
    }
    
    // Update employee with company_id
    await supabase
      .from('profiles_unified')
      .update({ company_id: businessAdmin.company_id })
      .eq('id', employee.id);
    
    console.log(`Updated employee to be associated with company ${businessAdmin.company_id}`);
    
    await ensureEmployeeInCompany(employee.id, businessAdmin.company_id);
    
  } catch (error) {
    console.error("Error associating employee with company:", error);
  }
};

// Ensure the employee exists in company_employees table
const ensureEmployeeInCompany = async (employeeId: string, companyId: string) => {
  try {
    // Check if employee is already in company_employees
    const { data: existingRelation } = await supabase
      .from('company_employees')
      .select('id')
      .eq('employee_id', employeeId)
      .eq('company_id', companyId)
      .maybeSingle();
      
    if (existingRelation) {
      console.log(`Employee ${employeeId} already in company_employees table`);
      return;
    }
    
    // Get IT department
    const { data: itDept } = await supabase
      .from('company_departments')
      .select('id')
      .eq('company_id', companyId)
      .eq('name', 'IT')
      .maybeSingle();
      
    // Add to company_employees
    await supabase
      .from('company_employees')
      .insert({
        company_id: companyId,
        employee_id: employeeId,
        job_title: 'Développeur Web',
        department_id: itDept?.id || null,
        status: 'active'
      });
      
    console.log(`Added employee ${employeeId} to company_employees table`);
  } catch (error) {
    console.error(`Error ensuring employee in company: ${error}`);
  }
};
