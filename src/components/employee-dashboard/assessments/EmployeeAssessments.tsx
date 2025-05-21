
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, Clock, Calendar, CheckCircle2, XCircle, ArrowRight
} from 'lucide-react';
import { assessmentService } from '@/services/assessment-service';

const EmployeeAssessments = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [assessments, setAssessments] = useState<any[]>([]);
  
  useEffect(() => {
    const loadData = async () => {
      if (!currentUser) return;
      
      setLoading(true);
      try {
        const employeeAssessments = await assessmentService.getEmployeeAssessments(currentUser.id);
        setAssessments(employeeAssessments);
      } catch (error) {
        console.error("Error loading employee assessments:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [currentUser]);
  
  const formatDueDate = (dateString?: string) => {
    if (!dateString) return 'Aucune date limite';
    
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Expiré';
    if (diffDays === 0) return 'Aujourd\'hui';
    if (diffDays === 1) return 'Demain';
    if (diffDays < 7) return `Dans ${diffDays} jours`;
    
    return date.toLocaleDateString('fr-FR', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  const getStatusBadge = (assessment: any) => {
    if (assessment.has_submitted) {
      if (assessment.passed === true) {
        return <Badge className="bg-green-500">Réussi</Badge>;
      } else if (assessment.passed === false) {
        return <Badge variant="destructive">Échoué</Badge>;
      } else {
        return <Badge variant="secondary">Soumis</Badge>;
      }
    } else {
      const isDueDate = assessment.due_date ? new Date(assessment.due_date) < new Date() : false;
      return isDueDate ? 
        <Badge variant="destructive">En retard</Badge> : 
        <Badge variant="outline">À faire</Badge>;
    }
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-schoolier-teal"></div>
      </div>
    );
  }
  
  const pendingAssessments = assessments.filter(a => !a.has_submitted);
  const completedAssessments = assessments.filter(a => a.has_submitted);
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Mes évaluations</h1>
      
      <div className="space-y-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-schoolier-teal" />
          Évaluations en attente
        </h2>
        
        {pendingAssessments.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pendingAssessments.map(assessment => (
              <Card key={assessment.id} className="flex flex-col">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>{assessment.title}</CardTitle>
                    {assessment.assessment_types?.is_mandatory && (
                      <Badge variant="destructive">Obligatoire</Badge>
                    )}
                  </div>
                  <CardDescription>
                    {assessment.description || 'Aucune description disponible'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Date limite:</span>
                      </div>
                      <span>{formatDueDate(assessment.due_date)}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Durée estimée:</span>
                      </div>
                      <span>10-15 min</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    Commencer l'évaluation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="pt-6 text-center">
              <CheckCircle2 className="mx-auto h-12 w-12 text-green-500 opacity-50" />
              <p className="mt-2 text-muted-foreground">
                Aucune évaluation en attente pour le moment
              </p>
            </CardContent>
          </Card>
        )}
        
        <h2 className="text-lg font-semibold flex items-center gap-2 mt-8">
          <CheckCircle2 className="h-5 w-5 text-schoolier-teal" />
          Évaluations complétées
        </h2>
        
        {completedAssessments.length > 0 ? (
          <div className="space-y-4">
            {completedAssessments.map(assessment => (
              <Card key={assessment.id}>
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-medium">{assessment.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>Complété le {new Date(assessment.submitted_at).toLocaleDateString('fr-FR')}</span>
                        <span>•</span>
                        {getStatusBadge(assessment)}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      {assessment.score !== null && (
                        <div className="text-center">
                          <div className="flex items-center gap-2">
                            {assessment.score >= 70 ? (
                              <CheckCircle2 className="h-4 w-4 text-green-500" />
                            ) : (
                              <XCircle className="h-4 w-4 text-red-500" />
                            )}
                            <span className="font-medium">{assessment.score}%</span>
                          </div>
                          <p className="text-xs text-muted-foreground">Score</p>
                        </div>
                      )}
                      
                      <Button variant="ghost" size="sm">
                        Voir les résultats
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="pt-6 text-center">
              <XCircle className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
              <p className="mt-2 text-muted-foreground">
                Aucune évaluation complétée pour le moment
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default EmployeeAssessments;
