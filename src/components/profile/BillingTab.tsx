
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";

const BillingTab: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Informations de facturation</CardTitle>
        <CardDescription>
          Gérez vos informations de paiement et votre historique d'achat
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <CreditCard className="h-16 w-16 mx-auto text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">Aucune méthode de paiement</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Vous n'avez pas encore ajouté de méthode de paiement à votre compte.
          </p>
          <Button className="mt-6">
            Ajouter une méthode de paiement
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BillingTab;
