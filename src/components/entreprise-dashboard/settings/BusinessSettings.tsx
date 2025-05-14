
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import CompanyProfileForm from "./CompanyProfileForm";
import BillingForm from "./BillingForm";
import SecurityForm from "./SecurityForm";
import NotificationsForm from "./NotificationsForm";

const BusinessSettings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Paramètres</h1>
        <p className="text-muted-foreground">Configurez les paramètres de votre espace entreprise.</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-2 md:grid-cols-4 gap-2">
          <TabsTrigger value="profile">Profil entreprise</TabsTrigger>
          <TabsTrigger value="billing">Facturation</TabsTrigger>
          <TabsTrigger value="security">Sécurité</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <Card>
            <CompanyProfileForm />
          </Card>
        </TabsContent>
        
        <TabsContent value="billing">
          <Card>
            <BillingForm />
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
          <Card>
            <SecurityForm />
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <NotificationsForm />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BusinessSettings;
