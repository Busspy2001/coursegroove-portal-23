
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Building, 
  CreditCard,
  Bell,
  Lock,
  Users,
  RefreshCw
} from "lucide-react";
import { CompanyProfileForm } from "./CompanyProfileForm";
import { BillingForm } from "./BillingForm";
import { NotificationsForm } from "./NotificationsForm";
import { SecurityForm } from "./SecurityForm";

const BusinessSettings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Paramètres</h1>
        <p className="text-muted-foreground">Configurez les paramètres de votre espace entreprise.</p>
      </div>
      
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
          <TabsTrigger value="profile" className="flex gap-2">
            <Building className="h-4 w-4" />
            <span className="hidden md:inline">Profil</span>
          </TabsTrigger>
          <TabsTrigger value="billing" className="flex gap-2">
            <CreditCard className="h-4 w-4" />
            <span className="hidden md:inline">Facturation</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden md:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex gap-2">
            <Lock className="h-4 w-4" />
            <span className="hidden md:inline">Sécurité</span>
          </TabsTrigger>
          <TabsTrigger value="users" className="flex gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden md:inline">Utilisateurs</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <CompanyProfileForm />
        </TabsContent>
        
        <TabsContent value="billing">
          <BillingForm />
        </TabsContent>
        
        <TabsContent value="notifications">
          <NotificationsForm />
        </TabsContent>
        
        <TabsContent value="security">
          <SecurityForm />
        </TabsContent>
        
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>Gestion des utilisateurs</CardTitle>
              <CardDescription>
                Gérez les administrateurs de votre espace entreprise
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Cette section vous permet d'ajouter ou de retirer des utilisateurs avec des droits d'administration sur votre espace entreprise.
                </p>
                
                <div className="rounded-md border">
                  <div className="p-4 flex justify-between items-center">
                    <div>
                      <p className="font-medium">Sophie Martin</p>
                      <p className="text-sm text-muted-foreground">sophie.martin@exemple.fr</p>
                    </div>
                    <p className="text-sm">Administrateur principal</p>
                  </div>
                  
                  <div className="border-t p-4 flex justify-between items-center">
                    <div>
                      <p className="font-medium">Thomas Dubois</p>
                      <p className="text-sm text-muted-foreground">thomas.dubois@exemple.fr</p>
                    </div>
                    <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                      Révoquer
                    </Button>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row gap-4 items-end">
                  <div className="flex-grow space-y-2">
                    <Label htmlFor="new-admin">Ajouter un administrateur</Label>
                    <Input id="new-admin" placeholder="Email du collaborateur" />
                  </div>
                  <Button className="md:mb-0.5">
                    Ajouter
                  </Button>
                </div>
              </div>
              
              <div className="rounded-md border p-4 bg-amber-50">
                <div className="flex items-start space-x-4">
                  <RefreshCw className="h-5 w-5 text-amber-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Synchronisation avec votre annuaire d'entreprise</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Vous pouvez synchroniser les utilisateurs et les structures de votre annuaire d'entreprise (Active Directory, LDAP, SSO).
                    </p>
                    <Button variant="outline">
                      Configurer la synchronisation
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BusinessSettings;
