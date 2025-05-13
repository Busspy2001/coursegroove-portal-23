
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, PieChart, LineChart, Users, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const StatisticsModule = () => {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold tracking-tight">Statistiques</h2>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Aperçu des données
          </CardTitle>
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-2">
            <div className="flex flex-col space-y-1">
              <span className="text-xs text-muted-foreground">Utilisateurs actifs</span>
              <span className="text-xl font-bold">5,247</span>
            </div>
            <div className="flex flex-col space-y-1">
              <span className="text-xs text-muted-foreground">Revenue du mois</span>
              <span className="text-xl font-bold">€42,890</span>
            </div>
            <div className="flex flex-col space-y-1">
              <span className="text-xs text-muted-foreground">Taux complétion</span>
              <span className="text-xl font-bold">68%</span>
            </div>
          </div>
          
          <div className="mt-6">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigate('/admin/statistics')}
              className="w-full flex items-center justify-between"
            >
              Voir les statistiques détaillées
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-2 gap-4">
        <Button 
          variant="outline" 
          className="h-20 flex flex-col items-center justify-center"
          onClick={() => navigate('/admin/statistics/students')}
        >
          <Users className="h-5 w-5 mb-1 text-schoolier-teal" />
          <span className="text-xs">Statistiques étudiants</span>
        </Button>
        
        <Button 
          variant="outline" 
          className="h-20 flex flex-col items-center justify-center"
          onClick={() => navigate('/admin/statistics/instructors')}
        >
          <PieChart className="h-5 w-5 mb-1 text-schoolier-blue" />
          <span className="text-xs">Statistiques instructeurs</span>
        </Button>
        
        <Button 
          variant="outline" 
          className="h-20 flex flex-col items-center justify-center"
          onClick={() => navigate('/admin/statistics/comparison')}
        >
          <BarChart3 className="h-5 w-5 mb-1 text-schoolier-red" />
          <span className="text-xs">B2C vs B2B</span>
        </Button>
        
        <Button 
          variant="outline" 
          className="h-20 flex flex-col items-center justify-center"
          onClick={() => navigate('/admin/statistics/trends')}
        >
          <LineChart className="h-5 w-5 mb-1 text-schoolier-purple" />
          <span className="text-xs">Tendances & prévisions</span>
        </Button>
      </div>
    </div>
  );
};

export default StatisticsModule;
