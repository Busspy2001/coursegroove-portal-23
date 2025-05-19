
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/auth";
import { useCompanyData } from "../overview/useCompanyData";
import { NoCompanyMessage } from "../employees/components/NoCompanyMessage";
import { useNavigate } from "react-router-dom";

export const BusinessBilling: React.FC = () => {
  const { currentUser } = useAuth();
  const { companyData, loading, stats } = useCompanyData(currentUser);
  const navigate = useNavigate();
  
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
        <h1 className="text-2xl font-bold tracking-tight">Facturation</h1>
        <p className="text-muted-foreground">
          Gérez les informations de paiement et abonnements
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Historique de facturation</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Les détails de votre abonnement et factures apparaîtront ici.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
