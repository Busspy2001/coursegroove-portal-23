
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/auth";
import { useCompanyData } from "../overview/useCompanyData";
import { NoCompanyMessage } from "../employees/components/NoCompanyMessage";
import { useNavigate } from "react-router-dom";
import { CreditCard, Download, Calendar, CheckCircle, AlertTriangle } from "lucide-react";

const BusinessBilling: React.FC = () => {
  const { currentUser } = useAuth();
  const { companyData, loading, stats } = useCompanyData(currentUser);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Données fictives pour la facturation
  const subscriptionData = {
    plan: "Business Premium",
    status: "Actif",
    renewalDate: "15 juin 2025",
    amount: "199,90 €",
    period: "mensuel",
    maxEmployees: 50,
    features: [
      "Formations illimitées",
      "Rapports personnalisés",
      "Support prioritaire",
      "Intégration API"
    ]
  };
  
  const invoices = [
    { id: "INV-2023-05", date: "5 mai 2025", amount: "199,90 €", status: "payé" },
    { id: "INV-2023-04", date: "5 avril 2025", amount: "199,90 €", status: "payé" },
    { id: "INV-2023-03", date: "5 mars 2025", amount: "199,90 €", status: "payé" },
    { id: "INV-2023-02", date: "5 février 2025", amount: "149,90 €", status: "payé" },
    { id: "INV-2023-01", date: "5 janvier 2025", amount: "149,90 €", status: "payé" }
  ];
  
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

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="invoices">Factures</TabsTrigger>
          <TabsTrigger value="payment">Moyens de paiement</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Votre abonnement</CardTitle>
                <CardDescription>Détails de votre plan actuel</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-lg">{subscriptionData.plan}</p>
                    <p className="text-muted-foreground">{subscriptionData.amount} / {subscriptionData.period}</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                    {subscriptionData.status}
                  </Badge>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex items-center text-sm mb-1">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-muted-foreground">Prochain renouvellement:</span>
                    <span className="ml-2 font-medium">{subscriptionData.renewalDate}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CreditCard className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-muted-foreground">Moyen de paiement:</span>
                    <span className="ml-2">•••• •••• •••• 4242</span>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <p className="text-sm font-medium mb-2">Fonctionnalités incluses:</p>
                  <ul className="space-y-2 text-sm">
                    {subscriptionData.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Changer de plan</Button>
                <Button variant="destructive">Annuler l'abonnement</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Utilisation</CardTitle>
                <CardDescription>Suivi de votre consommation actuelle</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Employés</span>
                    <span className="text-sm font-medium">{stats?.total_employees || 0} / {subscriptionData.maxEmployees}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-schoolier-blue"
                      style={{width: `${Math.min(100, ((stats?.total_employees || 0) / subscriptionData.maxEmployees) * 100)}%`}}
                    />
                  </div>
                  {stats?.total_employees && stats.total_employees > subscriptionData.maxEmployees * 0.8 && (
                    <div className="flex items-center text-amber-600 text-xs">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      <span>Vous approchez de votre limite d'employés</span>
                    </div>
                  )}
                </div>
                
                <div className="border-t pt-4 space-y-2">
                  <p className="text-sm font-medium">Récapitulatif des coûts</p>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Abonnement de base</span>
                    <span>{subscriptionData.amount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Employés supplémentaires</span>
                    <span>0,00 €</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Remise fidélité</span>
                    <span className="text-green-600">-19,99 €</span>
                  </div>
                  <div className="flex justify-between font-medium pt-2 border-t">
                    <span>Total</span>
                    <span>179,91 €</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Télécharger la facture
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="invoices">
          <Card>
            <CardHeader>
              <CardTitle>Historique des factures</CardTitle>
              <CardDescription>Vos factures des 6 derniers mois</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-4 p-3 bg-muted/50 text-sm font-medium">
                  <div>Numéro</div>
                  <div>Date</div>
                  <div>Montant</div>
                  <div className="text-right">Actions</div>
                </div>
                {invoices.map((invoice, i) => (
                  <div 
                    key={invoice.id} 
                    className={`grid grid-cols-4 p-3 items-center ${i !== invoices.length - 1 ? 'border-b' : ''}`}
                  >
                    <div>
                      <div className="font-medium">{invoice.id}</div>
                    </div>
                    <div>{invoice.date}</div>
                    <div>
                      <div className="font-medium">{invoice.amount}</div>
                      <div className="text-xs capitalize text-green-600">{invoice.status}</div>
                    </div>
                    <div className="text-right">
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="payment">
          <Card>
            <CardHeader>
              <CardTitle>Moyens de paiement</CardTitle>
              <CardDescription>Gérez vos méthodes de paiement</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-md">
                <div className="flex items-center">
                  <div className="bg-gray-100 p-2 rounded mr-3">
                    <CreditCard className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">Visa se terminant par 4242</p>
                    <p className="text-sm text-muted-foreground">Expire en 04/2026</p>
                  </div>
                </div>
                <Badge>Par défaut</Badge>
              </div>
              
              <Button className="w-full">
                Ajouter un moyen de paiement
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BusinessBilling;
