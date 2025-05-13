
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, MoreHorizontal, Building, Users, CreditCard, ListChecks, ChevronDown } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminBusinessManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("companies");
  
  // Mock business data
  const businesses = [
    { 
      id: 1, 
      name: "Acme Corporation", 
      plan: "enterprise", 
      employees: 128,
      status: "active",
      joined: "10/01/2025",
      lastBilling: "01/05/2025",
      contact: "john.doe@acme.com"
    },
    { 
      id: 2, 
      name: "Globex Industries", 
      plan: "business", 
      employees: 45,
      status: "active",
      joined: "15/02/2025",
      lastBilling: "01/05/2025",
      contact: "sarah.smith@globex.com"
    },
    { 
      id: 3, 
      name: "Initech Solutions", 
      plan: "team", 
      employees: 17,
      status: "pending",
      joined: "28/04/2025",
      lastBilling: "N/A",
      contact: "michael.bolton@initech.com"
    }
  ];

  // Mock plans data
  const plans = [
    {
      id: 1,
      name: "Team",
      price: "499€",
      users: "Up to 20",
      features: ["Access to all courses", "Team analytics", "Shared progress tracking"]
    },
    {
      id: 2,
      name: "Business",
      price: "999€",
      users: "Up to 50",
      features: ["Team features", "Custom learning paths", "Priority support"]
    },
    {
      id: 3,
      name: "Enterprise",
      price: "Custom",
      users: "Unlimited",
      features: ["Business features", "White labeling", "API access", "Dedicated CSM"]
    }
  ];

  const filteredBusinesses = businesses.filter(business => 
    business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    business.contact.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Gestion des Entreprises</h2>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 w-full max-w-md mb-6">
          <TabsTrigger value="companies">
            <Building className="h-4 w-4 mr-2" />
            Entreprises
          </TabsTrigger>
          <TabsTrigger value="plans">
            <ListChecks className="h-4 w-4 mr-2" />
            Plans
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <ChevronDown className="h-4 w-4 mr-2" />
            Statistiques
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="companies" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher une entreprise ou contact..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex space-x-2">
              <Button>+ Nouvelle Entreprise</Button>
            </div>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[250px]">Entreprise</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Employés</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Date d'inscription</TableHead>
                    <TableHead>Dernière Facturation</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBusinesses.map(business => (
                    <TableRow key={business.id}>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <div className="h-8 w-8 rounded bg-schoolier-blue flex items-center justify-center text-white font-medium">
                            {business.name.substring(0, 2).toUpperCase()}
                          </div>
                          <span className="font-medium">{business.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {business.plan}
                        </Badge>
                      </TableCell>
                      <TableCell>{business.employees}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={business.status === "active" ? "default" : "secondary"}
                          className={business.status === "active" ? "bg-green-100 text-green-800" : ""}
                        >
                          {business.status === "active" ? "Actif" : "En attente"}
                        </Badge>
                      </TableCell>
                      <TableCell>{business.contact}</TableCell>
                      <TableCell>{business.joined}</TableCell>
                      <TableCell>{business.lastBilling}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="cursor-pointer">
                              <Users className="h-4 w-4 mr-2" />
                              Gérer les Employés
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                              <CreditCard className="h-4 w-4 mr-2" />
                              Gérer l'Abonnement
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                              <Building className="h-4 w-4 mr-2" />
                              Détails de l'Entreprise
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="plans" className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map(plan => (
            <Card key={plan.id}>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span className="text-xl">{plan.name}</span>
                  <Badge variant="default" className="bg-schoolier-teal">
                    {plan.price}/mois
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {plan.users}
                </p>
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="text-sm flex items-center">
                      <svg className="h-4 w-4 mr-2 text-schoolier-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-4 border-t">
                  <Button className="w-full">Modifier le Plan</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="analytics">
          <div className="bg-amber-50 border border-amber-200 rounded-md p-4 text-amber-800">
            <h3 className="font-medium mb-2">Fonctionnalité en développement</h3>
            <p>Les statistiques avancées pour les entreprises seront disponibles prochainement.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminBusinessManagement;
