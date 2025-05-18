
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

// Types
type Department = {
  id: string;
  name: string;
  description: string | null;
  manager_id: string | null;
  manager_name?: string;
  employee_count?: number;
};

type Employee = {
  id: string;
  full_name: string | null;
  email: string | null;
  avatar_url: string | null;
  job_title: string | null;
  department_id: string | null;
  department_name?: string;
  joined_at: string | null;
  status: string | null;
};

type CompanyCourse = {
  id: string;
  title: string;
  description: string | null;
  is_required: boolean;
  category: string | null;
  duration: string | null;
  created_at: string;
};

type CourseAssignment = {
  id: string;
  course_id: string;
  employee_id: string;
  department_id: string | null;
  assigned_by: string | null;
  due_date: string | null;
  completed: boolean;
  completed_at: string | null;
  course_title?: string;
  employee_name?: string;
};

type BusinessStatistics = {
  total_employees: number;
  active_courses: number;
  completion_rate: number;
  departments_count: number;
  recent_activities: Array<{
    type: string;
    message: string;
    date: string;
  }>;
};

// Récupérer les données de l'entreprise associée à l'utilisateur actuel
export const fetchCompanyData = async () => {
  try {
    const { data: userData } = await supabase.auth.getUser();
    
    if (!userData?.user) throw new Error('Utilisateur non authentifié');
    
    // Récupérer l'entreprise où l'utilisateur est administrateur
    const { data: company, error } = await supabase
      .from('companies')
      .select('*')
      .eq('admin_id', userData.user.id)
      .single();
    
    if (error) throw error;
    
    return company;
  } catch (error) {
    console.error('Erreur lors de la récupération des données de l\'entreprise:', error);
    return null;
  }
};

// Départements
export const fetchDepartments = async (companyId: string) => {
  try {
    const { data, error } = await supabase
      .from('company_departments')
      .select(`
        *,
        manager:manager_id(id, full_name),
        employees:company_employees(id)
      `)
      .eq('company_id', companyId);
    
    if (error) throw error;
    
    // Transformer les données pour inclure le nom du responsable et le nombre d'employés
    return data.map(dep => ({
      ...dep,
      manager_name: dep.manager?.full_name || 'Non assigné',
      employee_count: dep.employees ? dep.employees.length : 0
    }));
  } catch (error) {
    console.error('Erreur lors de la récupération des départements:', error);
    return [];
  }
};

export const createDepartment = async (companyId: string, departmentData: Partial<Department>) => {
  try {
    const { data, error } = await supabase
      .from('company_departments')
      .insert([
        { 
          company_id: companyId,
          name: departmentData.name,
          description: departmentData.description,
          manager_id: departmentData.manager_id
        }
      ])
      .select();
    
    if (error) throw error;
    
    toast({
      title: "Département créé",
      description: `Le département "${departmentData.name}" a été créé avec succès.`
    });
    
    return data[0];
  } catch (error) {
    console.error('Erreur lors de la création du département:', error);
    toast({
      title: "Erreur",
      description: "Impossible de créer le département. Veuillez réessayer.",
      variant: "destructive"
    });
    return null;
  }
};

export const updateDepartment = async (departmentId: string, departmentData: Partial<Department>) => {
  try {
    const { data, error } = await supabase
      .from('company_departments')
      .update({
        name: departmentData.name,
        description: departmentData.description,
        manager_id: departmentData.manager_id,
        updated_at: new Date().toISOString()
      })
      .eq('id', departmentId)
      .select();
    
    if (error) throw error;
    
    toast({
      title: "Département mis à jour",
      description: `Le département "${departmentData.name}" a été mis à jour avec succès.`
    });
    
    return data[0];
  } catch (error) {
    console.error('Erreur lors de la mise à jour du département:', error);
    toast({
      title: "Erreur",
      description: "Impossible de mettre à jour le département. Veuillez réessayer.",
      variant: "destructive"
    });
    return null;
  }
};

export const deleteDepartment = async (departmentId: string, departmentName: string) => {
  try {
    const { error } = await supabase
      .from('company_departments')
      .delete()
      .eq('id', departmentId);
    
    if (error) throw error;
    
    toast({
      title: "Département supprimé",
      description: `Le département "${departmentName}" a été supprimé avec succès.`
    });
    
    return true;
  } catch (error) {
    console.error('Erreur lors de la suppression du département:', error);
    toast({
      title: "Erreur",
      description: "Impossible de supprimer le département. Veuillez réessayer.",
      variant: "destructive"
    });
    return false;
  }
};

// Employés
export const fetchEmployees = async (companyId: string) => {
  try {
    const { data, error } = await supabase
      .from('company_employees')
      .select(`
        *,
        employee:employee_id(id, full_name, email, avatar_url),
        department:department_id(id, name)
      `)
      .eq('company_id', companyId);
    
    if (error) throw error;
    
    // Transformer les données pour un format plus facile à utiliser
    return data.map(item => ({
      id: item.employee.id,
      full_name: item.employee.full_name,
      email: item.employee.email,
      avatar_url: item.employee.avatar_url,
      job_title: item.job_title,
      department_id: item.department_id,
      department_name: item.department?.name || 'Non assigné',
      joined_at: item.joined_at,
      status: item.status
    }));
  } catch (error) {
    console.error('Erreur lors de la récupération des employés:', error);
    return [];
  }
};

export const addEmployee = async (companyId: string, employeeData: Partial<Employee>) => {
  try {
    // Vérifier si l'employé existe déjà dans les profils
    let employeeId = employeeData.id;
    
    if (!employeeId) {
      // Dans un système réel, nous inviterions l'employé par email
      // Pour notre démo, nous allons simplement créer un nouveau profil
      const { data: newProfile, error: profileError } = await supabase
        .from('profiles_unified')
        .insert([
          {
            full_name: employeeData.full_name,
            email: employeeData.email,
            role: 'employee',
            company_id: companyId
          }
        ])
        .select();
      
      if (profileError) throw profileError;
      
      employeeId = newProfile[0].id;
    }
    
    // Ajouter l'employé à l'entreprise
    const { data, error } = await supabase
      .from('company_employees')
      .insert([
        {
          company_id: companyId,
          employee_id: employeeId,
          department_id: employeeData.department_id,
          job_title: employeeData.job_title,
          status: employeeData.status || 'active'
        }
      ])
      .select();
    
    if (error) throw error;
    
    toast({
      title: "Employé ajouté",
      description: `${employeeData.full_name} a été ajouté à votre entreprise.`
    });
    
    return data[0];
  } catch (error) {
    console.error('Erreur lors de l\'ajout de l\'employé:', error);
    toast({
      title: "Erreur",
      description: "Impossible d'ajouter l'employé. Veuillez réessayer.",
      variant: "destructive"
    });
    return null;
  }
};

export const updateEmployee = async (companyId: string, employeeId: string, employeeData: Partial<Employee>) => {
  try {
    const { data, error } = await supabase
      .from('company_employees')
      .update({
        department_id: employeeData.department_id,
        job_title: employeeData.job_title,
        status: employeeData.status,
        updated_at: new Date().toISOString()
      })
      .eq('company_id', companyId)
      .eq('employee_id', employeeId)
      .select();
    
    if (error) throw error;
    
    toast({
      title: "Employé mis à jour",
      description: `Les informations de l'employé ont été mises à jour avec succès.`
    });
    
    return data[0];
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'employé:', error);
    toast({
      title: "Erreur",
      description: "Impossible de mettre à jour l'employé. Veuillez réessayer.",
      variant: "destructive"
    });
    return null;
  }
};

export const removeEmployee = async (companyId: string, employeeId: string, employeeName: string) => {
  try {
    const { error } = await supabase
      .from('company_employees')
      .delete()
      .eq('company_id', companyId)
      .eq('employee_id', employeeId);
    
    if (error) throw error;
    
    toast({
      title: "Employé retiré",
      description: `${employeeName} a été retiré de votre entreprise.`
    });
    
    return true;
  } catch (error) {
    console.error('Erreur lors du retrait de l\'employé:', error);
    toast({
      title: "Erreur",
      description: "Impossible de retirer l'employé. Veuillez réessayer.",
      variant: "destructive"
    });
    return false;
  }
};

// Formations
export const fetchCompanyCourses = async (companyId: string) => {
  try {
    const { data, error } = await supabase
      .from('company_courses')
      .select('*')
      .eq('company_id', companyId);
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('Erreur lors de la récupération des formations:', error);
    return [];
  }
};

export const createCompanyCourse = async (companyId: string, courseData: Partial<CompanyCourse>) => {
  try {
    const { data, error } = await supabase
      .from('company_courses')
      .insert([
        {
          company_id: companyId,
          title: courseData.title,
          description: courseData.description,
          is_required: courseData.is_required || false,
          category: courseData.category,
          duration: courseData.duration
        }
      ])
      .select();
    
    if (error) throw error;
    
    toast({
      title: "Formation créée",
      description: `La formation "${courseData.title}" a été créée avec succès.`
    });
    
    return data[0];
  } catch (error) {
    console.error('Erreur lors de la création de la formation:', error);
    toast({
      title: "Erreur",
      description: "Impossible de créer la formation. Veuillez réessayer.",
      variant: "destructive"
    });
    return null;
  }
};

export const updateCompanyCourse = async (courseId: string, courseData: Partial<CompanyCourse>) => {
  try {
    const { data, error } = await supabase
      .from('company_courses')
      .update({
        title: courseData.title,
        description: courseData.description,
        is_required: courseData.is_required,
        category: courseData.category,
        duration: courseData.duration,
        updated_at: new Date().toISOString()
      })
      .eq('id', courseId)
      .select();
    
    if (error) throw error;
    
    toast({
      title: "Formation mise à jour",
      description: `La formation "${courseData.title}" a été mise à jour avec succès.`
    });
    
    return data[0];
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la formation:', error);
    toast({
      title: "Erreur", 
      description: "Impossible de mettre à jour la formation. Veuillez réessayer.",
      variant: "destructive"
    });
    return null;
  }
};

export const deleteCompanyCourse = async (courseId: string, courseTitle: string) => {
  try {
    const { error } = await supabase
      .from('company_courses')
      .delete()
      .eq('id', courseId);
    
    if (error) throw error;
    
    toast({
      title: "Formation supprimée",
      description: `La formation "${courseTitle}" a été supprimée avec succès.`
    });
    
    return true;
  } catch (error) {
    console.error('Erreur lors de la suppression de la formation:', error);
    toast({
      title: "Erreur",
      description: "Impossible de supprimer la formation. Veuillez réessayer.",
      variant: "destructive"
    });
    return false;
  }
};

// Assignations de formations
export const fetchCourseAssignments = async (companyId: string) => {
  try {
    const { data, error } = await supabase
      .from('course_assignments')
      .select(`
        *,
        employee:employee_id(id, full_name),
        course:course_id(id, title)
      `)
      .eq('company_id', companyId);
    
    if (error) throw error;
    
    // Transformer les données pour un format plus facile à utiliser
    return data.map(item => ({
      ...item,
      employee_name: item.employee?.full_name || 'Inconnu',
      course_title: item.course?.title || 'Formation inconnue'
    }));
  } catch (error) {
    console.error('Erreur lors de la récupération des assignations:', error);
    return [];
  }
};

export const assignCourse = async (
  companyId: string, 
  courseId: string, 
  employeeId: string,
  departmentId: string | null,
  assignerId: string,
  dueDate: string | null
) => {
  try {
    const { data, error } = await supabase
      .from('course_assignments')
      .insert([
        {
          company_id: companyId,
          course_id: courseId,
          employee_id: employeeId,
          department_id: departmentId,
          assigned_by: assignerId,
          due_date: dueDate,
          completed: false
        }
      ])
      .select();
    
    if (error) throw error;
    
    toast({
      title: "Formation assignée",
      description: `La formation a été assignée avec succès.`
    });
    
    return data[0];
  } catch (error) {
    console.error('Erreur lors de l\'assignation de la formation:', error);
    toast({
      title: "Erreur",
      description: "Impossible d'assigner la formation. Veuillez réessayer.",
      variant: "destructive"
    });
    return null;
  }
};

export const updateAssignmentStatus = async (assignmentId: string, completed: boolean) => {
  try {
    const { data, error } = await supabase
      .from('course_assignments')
      .update({
        completed: completed,
        completed_at: completed ? new Date().toISOString() : null,
        updated_at: new Date().toISOString()
      })
      .eq('id', assignmentId)
      .select();
    
    if (error) throw error;
    
    toast({
      title: completed ? "Formation complétée" : "Statut mis à jour",
      description: completed 
        ? "La formation a été marquée comme complétée." 
        : "Le statut de la formation a été mis à jour."
    });
    
    return data[0];
  } catch (error) {
    console.error('Erreur lors de la mise à jour du statut:', error);
    toast({
      title: "Erreur",
      description: "Impossible de mettre à jour le statut. Veuillez réessayer.",
      variant: "destructive"
    });
    return null;
  }
};

export const deleteAssignment = async (assignmentId: string) => {
  try {
    const { error } = await supabase
      .from('course_assignments')
      .delete()
      .eq('id', assignmentId);
    
    if (error) throw error;
    
    toast({
      title: "Assignation supprimée",
      description: `L'assignation de formation a été supprimée avec succès.`
    });
    
    return true;
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'assignation:', error);
    toast({
      title: "Erreur",
      description: "Impossible de supprimer l'assignation. Veuillez réessayer.",
      variant: "destructive"
    });
    return false;
  }
};

// Statistiques
export const fetchBusinessStatistics = async (companyId: string) => {
  try {
    // Récupérer le nombre total d'employés
    const { data: employeesData, error: employeesError } = await supabase
      .from('company_employees')
      .select('id')
      .eq('company_id', companyId);
    
    if (employeesError) throw employeesError;
    
    // Récupérer le nombre de cours actifs
    const { data: coursesData, error: coursesError } = await supabase
      .from('company_courses')
      .select('id')
      .eq('company_id', companyId);
    
    if (coursesError) throw coursesError;
    
    // Récupérer les statistiques de complétion
    const { data: assignmentsData, error: assignmentsError } = await supabase
      .from('course_assignments')
      .select('completed')
      .eq('company_id', companyId);
    
    if (assignmentsError) throw assignmentsError;
    
    const completedAssignments = assignmentsData.filter(a => a.completed).length;
    const completionRate = assignmentsData.length > 0 
      ? (completedAssignments / assignmentsData.length) * 100 
      : 0;
    
    // Récupérer le nombre de départements
    const { data: departmentsData, error: departmentsError } = await supabase
      .from('company_departments')
      .select('id')
      .eq('company_id', companyId);
    
    if (departmentsError) throw departmentsError;
    
    // Créer des activités récentes fictives pour la démo
    // Dans une application réelle, cela viendrait d'une table d'événements
    const recentActivities = [
      {
        type: 'employee',
        message: 'Nouvel employé ajouté: Sarah Martin',
        date: new Date(Date.now() - 3600000).toISOString()
      },
      {
        type: 'course',
        message: 'Formation "Introduction à la cybersécurité" créée',
        date: new Date(Date.now() - 86400000).toISOString()
      },
      {
        type: 'assignment',
        message: 'Jean Dupont a complété la formation "Excel avancé"',
        date: new Date(Date.now() - 172800000).toISOString()
      }
    ];
    
    return {
      total_employees: employeesData.length,
      active_courses: coursesData.length,
      completion_rate: Math.round(completionRate),
      departments_count: departmentsData.length,
      recent_activities: recentActivities
    };
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques:', error);
    return {
      total_employees: 0,
      active_courses: 0,
      completion_rate: 0,
      departments_count: 0,
      recent_activities: []
    };
  }
};

export type {
  Department,
  Employee,
  CompanyCourse,
  CourseAssignment,
  BusinessStatistics
};
