
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import { useCompanyData } from "../overview/useCompanyData";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { NoCompanyMessage } from "../employees/components/NoCompanyMessage";
import { Search, Send, ClipboardList, Users, Building2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { fetchEmployees, fetchDepartments } from "@/services/supabase-business-data";
import { Employee, Department } from "@/services/supabase-business-data";

interface Course {
  id: string;
  title: string;
  description?: string;
  category?: string;
  duration?: string;
}

const BusinessAssignTraining = () => {
  const { currentUser } = useAuth();
  const { companyData, loading } = useCompanyData(currentUser);
  const navigate = useNavigate();
  
  // État pour les données
  const [courses, setCourses] = useState<Course[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  
  // État pour la recherche et les filtres
  const [searchQuery, setSearchQuery] = useState('');
  const [assignTarget, setAssignTarget] = useState<'employees' | 'departments'>('employees');
  
  // État pour le formulaire
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');
  const [dueDate, setDueDate] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);
  
  // Charger les données
  useEffect(() => {
    const loadData = async () => {
      if (!companyData?.id) return;
      
      try {
        // Charger les formations
        const { data: coursesData, error: coursesError } = await supabase
          .from('company_courses')
          .select('id, title, description, category, duration')
          .eq('company_id', companyData.id);
          
        if (coursesError) throw coursesError;
        setCourses(coursesData || []);
        
        // Charger les employés et départements
        const employeesData = await fetchEmployees(companyData.id);
        const departmentsData = await fetchDepartments(companyData.id);
        
        setEmployees(employeesData);
        setDepartments(departmentsData);
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
        toast({
          title: "Erreur de chargement",
          description: "Impossible de charger les données nécessaires.",
          variant: "destructive"
        });
      }
    };
    
    if (companyData) {
      loadData();
    }
  }, [companyData]);
  
  // Filtrer les employés par recherche
  const filteredEmployees = employees.filter(employee => 
    employee.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.job_title?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Gérer la sélection/désélection des employés
  const toggleEmployeeSelection = (employeeId: string) => {
    setSelectedEmployees(prev => 
      prev.includes(employeeId) 
        ? prev.filter(id => id !== employeeId)
        : [...prev, employeeId]
    );
  };
  
  // Gérer la soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!companyData?.id) {
      toast({
        title: "Erreur",
        description: "Données de l'entreprise non disponibles",
        variant: "destructive"
      });
      return;
    }
    
    if (!selectedCourse) {
      toast({
        title: "Information requise",
        description: "Veuillez sélectionner une formation",
        variant: "destructive"
      });
      return;
    }
    
    if (assignTarget === 'employees' && selectedEmployees.length === 0) {
      toast({
        title: "Information requise",
        description: "Veuillez sélectionner au moins un employé",
        variant: "destructive"
      });
      return;
    }
    
    if (assignTarget === 'departments' && !selectedDepartment) {
      toast({
        title: "Information requise", 
        description: "Veuillez sélectionner un département",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setSubmitting(true);
      
      // Logique d'assignation pour le mode démo
      if (currentUser?.is_demo) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Pour des employés individuels
        if (assignTarget === 'employees') {
          // Simulation d'insertion dans Supabase
          for (const employeeId of selectedEmployees) {
            await supabase
              .from('course_assignments')
              .insert({
                company_id: companyData.id,
                course_id: selectedCourse,
                employee_id: employeeId,
                assigned_by: currentUser.id,
                due_date: dueDate || null
              });
          }
          
          toast({
            title: "Formation assignée",
            description: `Formation assignée à ${selectedEmployees.length} employé(s) avec succès`
          });
        } 
        // Pour un département entier
        else {
          const departmentEmployees = employees.filter(emp => emp.department_id === selectedDepartment);
          
          for (const emp of departmentEmployees) {
            await supabase
              .from('course_assignments')
              .insert({
                company_id: companyData.id,
                course_id: selectedCourse,
                employee_id: emp.id,
                department_id: selectedDepartment,
                assigned_by: currentUser.id,
                due_date: dueDate || null
              });
          }
          
          const departmentName = departments.find(d => d.id === selectedDepartment)?.name || "sélectionné";
          
          toast({
            title: "Formation assignée",
            description: `Formation assignée au département ${departmentName} avec succès`
          });
        }
      }
      
      // Redirection vers la page des formations
      navigate("/entreprise/formations");
    } catch (error) {
      console.error("Erreur lors de l'assignation de la formation:", error);
      toast({
        title: "Erreur",
        description: "Impossible d'assigner cette formation. Veuillez réessayer.",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };
  
  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 bg-gray-200 animate-pulse rounded w-1/3"></div>
        <div className="h-64 bg-gray-200 animate-pulse rounded"></div>
      </div>
    );
  }
  
  if (!companyData) {
    return <NoCompanyMessage onNavigate={navigate} isDemoUser={currentUser?.is_demo === true} />;
  }
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Assigner une formation</h1>
        <p className="text-muted-foreground">
          Attribuez des formations à vos collaborateurs ou à des départements entiers
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Sélectionner une formation</CardTitle>
          <CardDescription>
            Choisissez la formation que vous souhaitez assigner
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Sélection de la formation */}
            <div className="space-y-2">
              <Label htmlFor="course">Formation à assigner *</Label>
              <Select
                value={selectedCourse}
                onValueChange={setSelectedCourse}
              >
                <SelectTrigger id="course">
                  <SelectValue placeholder="Sélectionner une formation" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((course) => (
                    <SelectItem key={course.id} value={course.id}>
                      {course.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Date limite */}
            <div className="space-y-2">
              <Label htmlFor="dueDate">Date limite (optionnelle)</Label>
              <Input
                id="dueDate"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
            
            {/* Type d'assignation */}
            <div className="space-y-2">
              <Label>Assigner à</Label>
              <RadioGroup 
                defaultValue="employees" 
                value={assignTarget}
                onValueChange={(value) => setAssignTarget(value as 'employees' | 'departments')}
                className="flex flex-col space-y-1"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="employees" id="employees" />
                  <Label htmlFor="employees" className="flex items-center">
                    <Users className="mr-2 h-4 w-4" />
                    Employés spécifiques
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="departments" id="departments" />
                  <Label htmlFor="departments" className="flex items-center">
                    <Building2 className="mr-2 h-4 w-4" />
                    Département entier
                  </Label>
                </div>
              </RadioGroup>
            </div>
            
            {/* Assignation à des employés spécifiques */}
            {assignTarget === 'employees' && (
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Rechercher un employé..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="border rounded-md overflow-hidden">
                  <div className="bg-gray-50 dark:bg-gray-800 px-4 py-2 text-sm font-medium">
                    Employés ({filteredEmployees.length})
                  </div>
                  <div className="divide-y max-h-60 overflow-y-auto">
                    {filteredEmployees.length > 0 ? (
                      filteredEmployees.map((employee) => (
                        <div 
                          key={employee.id} 
                          className="flex items-center px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800"
                        >
                          <Checkbox
                            id={`employee-${employee.id}`}
                            checked={selectedEmployees.includes(employee.id)}
                            onCheckedChange={() => toggleEmployeeSelection(employee.id)}
                            className="mr-3"
                          />
                          <Label 
                            htmlFor={`employee-${employee.id}`}
                            className="flex-grow cursor-pointer text-sm"
                          >
                            <div>{employee.full_name || "Sans nom"}</div>
                            <div className="text-xs text-muted-foreground">
                              {employee.email} • {employee.department_name || "Sans département"}
                            </div>
                          </Label>
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-6 text-center text-muted-foreground">
                        Aucun employé trouvé
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="text-sm text-muted-foreground">
                  {selectedEmployees.length} employé(s) sélectionné(s)
                </div>
              </div>
            )}
            
            {/* Assignation à un département */}
            {assignTarget === 'departments' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="department">Département *</Label>
                  <Select
                    value={selectedDepartment}
                    onValueChange={setSelectedDepartment}
                  >
                    <SelectTrigger id="department">
                      <SelectValue placeholder="Sélectionner un département" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((department) => (
                        <SelectItem key={department.id} value={department.id}>
                          {department.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {selectedDepartment && (
                  <div className="text-sm text-muted-foreground">
                    {employees.filter(emp => emp.department_id === selectedDepartment).length} employé(s) dans ce département
                  </div>
                )}
              </div>
            )}
            
            <div className="flex justify-end gap-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate("/entreprise/formations")}
              >
                Annuler
              </Button>
              
              <Button 
                type="submit"
                disabled={submitting}
              >
                {submitting ? (
                  <>Assignation en cours...</>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Assigner la formation
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessAssignTraining;
