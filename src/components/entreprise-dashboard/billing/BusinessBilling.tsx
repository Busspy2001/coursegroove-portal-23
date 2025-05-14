
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Receipt, CreditCard } from "lucide-react";

const BusinessBilling = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Facturation</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Abonnement actuel</CardTitle>
            <CreditCard className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Plan Entreprise</div>
            <p className="text-sm text-muted-foreground mt-1">
              Accès illimité à toutes les formations pour 50 employés
            </p>
            <div className="mt-4 font-medium">Prochaine facturation: 15/06/2025</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Historique des paiements</CardTitle>
            <Receipt className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">Facture #2845</div>
                  <div className="text-sm text-muted-foreground">14/05/2025</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">299,00 €</div>
                  <div className="text-xs text-emerald-500">Payée</div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">Facture #2780</div>
                  <div className="text-sm text-muted-foreground">14/04/2025</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">299,00 €</div>
                  <div className="text-xs text-emerald-500">Payée</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BusinessBilling;
