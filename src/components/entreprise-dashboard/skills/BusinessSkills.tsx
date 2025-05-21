
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Lightbulb, AlertTriangle, Users, Award, Search, FileBarChart, ChevronRight
} from 'lucide-react';
import { businessService } from '@/services/business-service';
import { skillsService } from '@/services/skills-service';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const BusinessSkills = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [companyData, setCompanyData] = useState<any>(null);
  const [skillMatrix, setSkillMatrix] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('overview');
  
  useEffect(() => {
    const loadData = async () => {
      if (!currentUser) return;
      
      setLoading(true);
      try {
        // Get company data
        const company = await businessService.getCompanyData(currentUser.id);
        setCompanyData(company);
        
        if (company) {
          // Get skill matrix
          const matrix = await skillsService.getSkillMatrix(company.id);
          setSkillMatrix(matrix);
        }
      } catch (error) {
        console.error("Error loading skills data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [currentUser]);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-schoolier-teal"></div>
      </div>
    );
  }
  
  if (!companyData) {
    return (
      <Alert className="my-4">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Aucune entreprise associée</AlertTitle>
        <AlertDescription>
          Vous devez être associé à une entreprise pour accéder à cette fonctionnalité.
        </AlertDescription>
      </Alert>
    );
  }
  
  // Prepare metrics
  const totalEmployees = skillMatrix?.employees?.length || 0;
  const totalSkills = skillMatrix?.skills?.length || 0;
  const avgSkillsPerEmployee = totalEmployees > 0 && skillMatrix?.employees ? 
    Math.round(skillMatrix.employees.reduce((total: number, emp: any) => 
      total + emp.skills.filter((s: any) => s.proficiency > 0).length, 0) / totalEmployees) : 0;
      
  const getInitials = (name: string = '') => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Gestion des compétences</h1>
          <p className="text-muted-foreground">
            Suivez et gérez les compétences et certifications de vos équipes.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setActiveTab('skills')}>
            Gérer les compétences
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full md:w-auto grid-cols-3">
          <TabsTrigger value="overview">Aperçu</TabsTrigger>
          <TabsTrigger value="skills">Compétences</TabsTrigger>
          <TabsTrigger value="certifications">Certifications</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4 pt-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Compétences</CardTitle>
                <Lightbulb className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalSkills}</div>
                <p className="text-xs text-muted-foreground">
                  dans {skillMatrix?.categories?.length || 0} catégories
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Employés avec compétences</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalEmployees}</div>
                <p className="text-xs text-muted-foreground">
                  avec {avgSkillsPerEmployee} compétences en moyenne
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Certifications</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">--</div>
                <p className="text-xs text-muted-foreground">
                  en cours de développement
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Compétences principales</CardTitle>
                <CardDescription>
                  Les compétences les plus répandues dans l'entreprise
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {skillMatrix?.skills?.sort((a: any, b: any) => b.employee_count - a.employee_count).slice(0, 6).map((skill: any) => (
                    <div key={skill.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{skill.name}</p>
                        <p className="text-sm text-muted-foreground">{skill.category}</p>
                      </div>
                      <Badge variant="outline">
                        {skill.employee_count} employé{skill.employee_count > 1 ? 's' : ''}
                      </Badge>
                    </div>
                  ))}
                  
                  {(!skillMatrix?.skills || skillMatrix.skills.length === 0) && (
                    <div className="text-center py-6 text-muted-foreground">
                      <p>Aucune compétence enregistrée</p>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full" onClick={() => setActiveTab('skills')}>
                  Gérer les compétences
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Compétences manquantes</CardTitle>
                <CardDescription>
                  Compétences à développer en priorité
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Fonctionnalité en cours de développement</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Matrice des compétences</CardTitle>
                <CardDescription>
                  Vue d'ensemble des compétences par employé
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-72">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Employé</th>
                        {skillMatrix?.skills?.slice(0, 6).map((skill: any) => (
                          <th key={skill.id} className="p-2 text-left whitespace-nowrap">
                            {skill.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {skillMatrix?.employees?.slice(0, 8).map((employee: any) => (
                        <tr key={employee.id} className="border-b">
                          <td className="p-2">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={employee.avatar} />
                                <AvatarFallback>{getInitials(employee.name)}</AvatarFallback>
                              </Avatar>
                              <span>{employee.name}</span>
                            </div>
                          </td>
                          {skillMatrix?.skills?.slice(0, 6).map((skill: any) => {
                            const empSkill = employee.skills?.find((s: any) => s.skill_id === skill.id);
                            return (
                              <td key={skill.id} className="p-2">
                                {empSkill?.proficiency > 0 ? (
                                  <Badge className={`${empSkill.verified ? 'bg-schoolier-teal' : 'bg-amber-500'}`}>
                                    {empSkill.proficiency}/5
                                    {empSkill.verified && ' ✓'}
                                  </Badge>
                                ) : (
                                  <span className="text-muted-foreground">-</span>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                      
                      {(!skillMatrix?.employees || skillMatrix.employees.length === 0) && (
                        <tr>
                          <td colSpan={7} className="text-center py-6 text-muted-foreground">
                            <p>Aucun employé avec des compétences enregistrées</p>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </ScrollArea>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full" onClick={() => setActiveTab('skills')}>
                  Voir la matrice complète
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="skills" className="pt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Gestion des compétences</CardTitle>
                <CardDescription>
                  Ajoutez et modifiez les compétences de votre entreprise
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Search className="h-4 w-4 mr-1" />
                  Rechercher
                </Button>
                <Button size="sm" variant="default">
                  Ajouter une compétence
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-muted-foreground">Fonctionnalité en cours de développement</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="certifications" className="pt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Certifications</CardTitle>
                <CardDescription>
                  Gérez les certifications délivrées à vos employés
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <FileBarChart className="h-4 w-4 mr-1" />
                  Exporter
                </Button>
                <Button size="sm" variant="default">
                  Créer une certification
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-muted-foreground">Fonctionnalité en cours de développement</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BusinessSkills;
