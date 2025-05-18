
import { supabase } from "@/integrations/supabase/client";

export interface DemoAccount {
  email: string;
  password: string;
  role: string;
  name: string;
  avatar?: string;
  description?: string;
}

// List of demo accounts
export const demoAccounts: DemoAccount[] = [
  {
    email: "etudiant@schoolier.com",
    password: "demo123",
    role: "student",
    name: "Marie Martin",
    description: "Compte étudiant"
  },
  {
    email: "prof@schoolier.com",
    password: "demo123",
    role: "instructor",
    name: "Jean Dupont",
    description: "Compte formateur"
  },
  {
    email: "admin@schoolier.com",
    password: "demo123",
    role: "admin",
    name: "Admin Système",
    description: "Compte administrateur"
  },
  {
    email: "entreprise@schoolier.com",
    password: "demo123",
    role: "business_admin",
    name: "Thomas Durand",
    description: "Compte entreprise"
  },
  {
    email: "business@schoolier.com",
    password: "demo123",
    role: "business_admin",
    name: "Sophie Leroy",
    description: "Compte entreprise"
  },
  {
    email: "employee@schoolier.com",
    password: "demo123",
    role: "employee",
    name: "Pierre Martin",
    description: "Compte employé"
  }
];

export const isDemoAccount = (email: string): boolean => {
  return demoAccounts.some(account => account.email.toLowerCase() === email.toLowerCase());
};

// Make sure the demo accounts exist in the database
export const ensureDemoAccountsExist = async (): Promise<void> => {
  try {
    for (const account of demoAccounts) {
      // Check if account exists
      const { data: existingUser } = await supabase
        .from('profiles_unified')
        .select('id, email, role, is_demo')
        .eq('email', account.email)
        .single();

      // If account doesn't exist or needs updating
      if (!existingUser) {
        console.log(`Creating demo account for ${account.email}`);
        
        // For simplicity in a demo, we're directly creating entries in profiles_unified
        // In a real app, we would create auth users properly
        const { data, error } = await supabase
          .from('profiles_unified')
          .insert({
            id: crypto.randomUUID(), // Generate a random UUID
            email: account.email,
            full_name: account.name,
            role: account.role as "student" | "instructor" | "admin" | "business_admin" | "employee" | "super_admin" | "demo",
            is_demo: true,
            avatar_url: account.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(account.name)}&background=0D9488&color=fff`
          })
          .select();
          
        if (error) {
          console.error(`Error creating demo account for ${account.email}:`, error);
        } else if (data && data[0]) {
          console.log(`Demo account created for ${account.email}`);
          
          // If it's a business admin, create a company for them
          if (account.role === 'business_admin') {
            const { data: companyData, error: companyError } = await supabase
              .from('companies')
              .insert({
                name: `Entreprise de ${account.name}`,
                admin_id: data[0].id
              })
              .select();
              
            if (companyError) {
              console.error(`Error creating company for ${account.email}:`, companyError);
            } else if (companyData && companyData[0]) {
              // Update the user with the company ID
              await supabase
                .from('profiles_unified')
                .update({ company_id: companyData[0].id })
                .eq('id', data[0].id);
                
              // Create some departments
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
                    company_id: companyData[0].id,
                    position: departments.indexOf(dept) + 1
                  });
              }
            }
          }
        }
      } else if (existingUser && (!existingUser.is_demo || existingUser.role !== account.role)) {
        // Update the existing account with correct demo status and role
        await supabase
          .from('profiles_unified')
          .update({
            is_demo: true,
            role: account.role as "student" | "instructor" | "admin" | "business_admin" | "employee" | "super_admin" | "demo"
          })
          .eq('id', existingUser.id);
          
        console.log(`Updated demo status for ${account.email}`);
      }
    }
    
    // Ensure employee@schoolier.com is associated with a company
    await associateEmployeeWithCompany();
    
  } catch (error) {
    console.error("Error ensuring demo accounts exist:", error);
  }
};

// Helper function to associate the employee demo account with a company
const associateEmployeeWithCompany = async () => {
  try {
    // Get the employee account
    const { data: employee } = await supabase
      .from('profiles_unified')
      .select('id')
      .eq('email', 'employee@schoolier.com')
      .single();
      
    if (!employee) return;
    
    // Get a business admin account
    const { data: businessAdmin } = await supabase
      .from('profiles_unified')
      .select('id, company_id')
      .eq('email', 'business@schoolier.com')
      .single();
      
    if (!businessAdmin || !businessAdmin.company_id) return;
    
    // Update employee with company_id
    await supabase
      .from('profiles_unified')
      .update({ company_id: businessAdmin.company_id })
      .eq('id', employee.id);
      
    // Check if employee is already in company_employees
    const { data: existingRelation } = await supabase
      .from('company_employees')
      .select('id')
      .eq('employee_id', employee.id)
      .maybeSingle();
      
    if (!existingRelation) {
      // Get IT department
      const { data: itDept } = await supabase
        .from('company_departments')
        .select('id')
        .eq('company_id', businessAdmin.company_id)
        .eq('name', 'IT')
        .maybeSingle();
        
      // Add to company_employees
      await supabase
        .from('company_employees')
        .insert({
          company_id: businessAdmin.company_id,
          employee_id: employee.id,
          job_title: 'Développeur Web',
          department_id: itDept?.id || null,
          status: 'active'
        });
    }
  } catch (error) {
    console.error("Error associating employee with company:", error);
  }
};
