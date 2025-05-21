
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { 
  ListChecks, Users, Award, Brain, ChevronRight, Calendar, AlertTriangle, CheckCircle2, XCircle
} from 'lucide-react';
import { businessService } from '@/services/business-service';
import { assessmentService } from '@/services/assessment-service';

const BusinessAssessments = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [companyData, setCompanyData] = useState<any>(null);
  const [assessmentStats, setAssessmentStats] = useState<any>(null);
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
          // Get assessment statistics
          const stats = await assessmentService.getAssessmentStatistics(company.id);
          setAssessmentStats(stats);
        }
      } catch (error) {
        console.error("Error loading assessment data:", error);
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
  
  // Prepare chart data
  const completionData = [
    { name: 'Complétés', value: assessmentStats?.overall_completion_rate || 0 },
    { name: 'En attente', value: 100 - (assessmentStats?.overall_completion_rate || 0) }
  ];
  
  const CHART_COLORS = ['#0D9488', '#E5E7EB'];
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Évaluations des employés</h1>
          <p className="text-muted-foreground">
            Gérez et suivez les évaluations des compétences et tests obligatoires.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setActiveTab('create')}>
            Créer une évaluation
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full md:w-auto grid-cols-3">
          <TabsTrigger value="overview">Aperçu</TabsTrigger>
          <TabsTrigger value="assessments">Évaluations</TabsTrigger>
          <TabsTrigger value="reports">Rapports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4 pt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Taux de complétion</CardTitle>
                <ListChecks className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={completionData}
                          cx="50%"
                          cy="50%"
                          innerRadius={15}
                          outerRadius={30}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {completionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={CHART_COLORS[index]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">
                      {assessmentStats?.overall_completion_rate || 0}%
                    </div>
                    <p className="text-xs text-muted-foreground">
                      des évaluations obligatoires complétées
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Évaluations totales</CardTitle>
                <Brain className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{assessmentStats?.total_assessments || 0}</div>
                <p className="text-xs text-muted-foreground">
                  dont {assessmentStats?.total_mandatory || 0} obligatoires
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Évaluations récentes</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {assessmentStats?.assessments?.filter((a: any) => new Date(a.due_date) > new Date()).length || 0}
                </div>
                <p className="text-xs text-muted-foreground">
                  évaluations à venir ce mois-ci
                </p>
              </CardContent>
            </Card>
          </div>
          
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Évaluations récentes</CardTitle>
              <CardDescription>
                Suivi des évaluations récentes et à venir
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {assessmentStats?.assessments?.slice(0, 5).map((assessment: any) => (
                  <div key={assessment.id} className="flex items-center justify-between border-b pb-2">
                    <div>
                      <p className="font-medium">{assessment.title}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{assessment.department}</span>
                        <span>•</span>
                        <span>
                          {assessment.is_mandatory ? 
                            <Badge variant="destructive">Obligatoire</Badge> : 
                            <Badge variant="outline">Optionnel</Badge>
                          }
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        <Progress value={assessment.completion_rate} className="w-20" />
                        <span className="text-sm font-medium">{assessment.completion_rate}%</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {assessment.submitted_count}/{assessment.target_count} complétés
                      </p>
                    </div>
                  </div>
                ))}
                
                {(!assessmentStats?.assessments || assessmentStats.assessments.length === 0) && (
                  <div className="text-center py-6 text-muted-foreground">
                    <p>Aucune évaluation disponible pour le moment</p>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full" onClick={() => setActiveTab('assessments')}>
                Voir toutes les évaluations
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="assessments" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Liste des évaluations</CardTitle>
              <CardDescription>
                Gérez les évaluations de compétences pour vos équipes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {assessmentStats?.assessments?.map((assessment: any) => (
                  <div key={assessment.id} className="rounded-lg border p-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                      <div>
                        <h3 className="font-medium">{assessment.title}</h3>
                        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                          <Badge variant="outline">{assessment.type}</Badge>
                          <span>•</span>
                          <span>{assessment.department}</span>
                          {assessment.is_mandatory && (
                            <>
                              <span>•</span>
                              <Badge variant="destructive">Obligatoire</Badge>
                            </>
                          )}
                        </div>
                      </div>
                      <div>
                        <Button size="sm" variant="ghost">
                          Voir les détails
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Complétion</p>
                        <div className="flex items-center mt-1">
                          <Progress value={assessment.completion_rate} className="w-20 mr-2" />
                          <span className="text-sm font-medium">{assessment.completion_rate}%</span>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm text-muted-foreground">Taux de réussite</p>
                        <div className="flex items-center gap-2 mt-1">
                          {assessment.pass_rate >= 70 ? (
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-500" />
                          )}
                          <span className="text-sm font-medium">{assessment.pass_rate}%</span>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm text-muted-foreground">Score moyen</p>
                        <p className="text-sm font-medium">{assessment.average_score}/100</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-muted-foreground">Complétions</p>
                        <p className="text-sm font-medium">{assessment.submitted_count}/{assessment.target_count}</p>
                      </div>
                    </div>
                  </div>
                ))}
                
                {(!assessmentStats?.assessments || assessmentStats.assessments.length === 0) && (
                  <div className="text-center py-12 text-muted-foreground">
                    <ListChecks className="mx-auto h-12 w-12 opacity-30" />
                    <h3 className="mt-4 text-lg font-medium">Aucune évaluation</h3>
                    <p>Commencez par créer une évaluation pour vos employés</p>
                    <Button className="mt-4" onClick={() => setActiveTab('create')}>
                      Créer une évaluation
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reports" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Rapports d'évaluation</CardTitle>
              <CardDescription>
                Analysez les résultats et les tendances des évaluations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-muted-foreground">Fonctionnalité en cours de développement</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="create" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Créer une nouvelle évaluation</CardTitle>
              <CardDescription>
                Définissez les critères et questions de votre évaluation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-muted-foreground">Fonctionnalité en cours de développement</p>
                <Button className="mt-4" onClick={() => setActiveTab('overview')}>
                  Revenir à l'aperçu
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BusinessAssessments;
