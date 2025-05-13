
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { CreditCard, CircleDollarSign, FileBarChart, ArrowRight } from 'lucide-react';

const FinanceModule = () => {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold tracking-tight">Gestion Financière</h2>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Aperçu des finances
          </CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col space-y-1">
              <span className="text-xs text-muted-foreground">Transactions aujourd'hui</span>
              <span className="text-xl font-bold">138</span>
            </div>
            <div className="flex flex-col space-y-1">
              <span className="text-xs text-muted-foreground">Revenu aujourd'hui</span>
              <span className="text-xl font-bold">€4,289</span>
            </div>
          </div>
          
          <div className="mt-6">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigate('/admin/finance')}
              className="w-full flex items-center justify-between"
            >
              Voir les transactions
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 gap-4">
        <Button 
          variant="outline" 
          className="h-12 flex items-center justify-between px-4"
          onClick={() => navigate('/admin/finance/revenue')}
        >
          <div className="flex items-center">
            <CircleDollarSign className="h-4 w-4 mr-2 text-schoolier-teal" />
            <span>Revenus & Répartition</span>
          </div>
          <ArrowRight className="h-4 w-4" />
        </Button>
        
        <Button 
          variant="outline" 
          className="h-12 flex items-center justify-between px-4"
          onClick={() => navigate('/admin/finance/reports')}
        >
          <div className="flex items-center">
            <FileBarChart className="h-4 w-4 mr-2 text-schoolier-blue" />
            <span>Rapports financiers</span>
          </div>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default FinanceModule;
