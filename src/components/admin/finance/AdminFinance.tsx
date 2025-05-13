
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CalendarRange, CreditCard, Download, Eye, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export const AdminFinance = () => {
  const transactions = [
    { 
      id: "TX-12345", 
      date: "2025-05-12", 
      customer: "Jean Dupont", 
      amount: "€49.99", 
      status: "success",
      type: "Course Purchase",
      method: "Credit Card"
    },
    { 
      id: "TX-12344", 
      date: "2025-05-11", 
      customer: "Marie Laurent", 
      amount: "€99.99", 
      status: "success",
      type: "Certificate",
      method: "PayPal"
    },
    { 
      id: "TX-12343", 
      date: "2025-05-10", 
      customer: "Thomas Petit", 
      amount: "€149.99", 
      status: "pending",
      type: "B2B Subscription",
      method: "Bank Transfer"
    },
    { 
      id: "TX-12342", 
      date: "2025-05-09", 
      customer: "Sophie Martin", 
      amount: "€29.99", 
      status: "success",
      type: "Course Purchase",
      method: "Credit Card"
    },
    { 
      id: "TX-12341", 
      date: "2025-05-08", 
      customer: "Lucas Bernard", 
      amount: "€79.99", 
      status: "failed",
      type: "Course Bundle",
      method: "Credit Card"
    }
  ];
  
  const renderStatus = (status: string) => {
    switch (status) {
      case "success":
        return <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Réussie</span>;
      case "pending":
        return <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">En attente</span>;
      case "failed":
        return <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">Échouée</span>;
      default:
        return null;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
        <div>
          <h2 className="text-xl font-semibold">Transactions financières</h2>
          <p className="text-muted-foreground">Gestion et suivi des transactions</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Transactions aujourd'hui</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline">
              <div className="text-2xl font-bold">138</div>
              <div className="ml-2 text-sm text-green-500">+12%</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Revenu aujourd'hui</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline">
              <div className="text-2xl font-bold">€4,289</div>
              <div className="ml-2 text-sm text-green-500">+8.3%</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Taux de réussite</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.2%</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Panier moyen</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€84.50</div>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            type="search"
            placeholder="Rechercher des transactions..." 
            className="pl-8 w-full"
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filtres
          </Button>
          <Button variant="outline" size="sm">
            <CalendarRange className="h-4 w-4 mr-2" />
            Période
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CreditCard className="h-5 w-5 mr-2 text-schoolier-blue" />
            Transactions récentes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID Transaction</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead>Méthode</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">{transaction.id}</TableCell>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{transaction.customer}</TableCell>
                  <TableCell>{transaction.type}</TableCell>
                  <TableCell>{transaction.amount}</TableCell>
                  <TableCell>{transaction.method}</TableCell>
                  <TableCell>{renderStatus(transaction.status)}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">Voir les détails</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">Toutes</TabsTrigger>
          <TabsTrigger value="courses">Cours</TabsTrigger>
          <TabsTrigger value="certificates">Certifications</TabsTrigger>
          <TabsTrigger value="subscriptions">Abonnements</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          {/* Contenu déjà affiché au-dessus */}
        </TabsContent>
        
        <TabsContent value="courses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Transactions de cours</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center py-8">
                Filtrage par type de cours en développement
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="certificates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Transactions de certifications</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center py-8">
                Filtrage par certifications en développement
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="subscriptions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Abonnements</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center py-8">
                Filtrage par abonnements en développement
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
