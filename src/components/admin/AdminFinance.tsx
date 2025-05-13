
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, Download, Calendar, TrendingUp, CreditCard, 
  CircleDollarSign, BarChart3, PieChart, ArrowDownUp
} from "lucide-react";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, 
  Legend, ResponsiveContainer, BarChart, Bar
} from "recharts";

// Mock data for the charts
const revenueData = [
  { name: 'Jan', revenue: 15000 },
  { name: 'Fév', revenue: 18000 },
  { name: 'Mars', revenue: 22000 },
  { name: 'Avril', revenue: 21000 },
  { name: 'Mai', revenue: 25000 },
  { name: 'Juin', revenue: 28000 },
];

const transactionTypeData = [
  { name: 'Abonnements', value: 65 },
  { name: 'Cours uniques', value: 25 },
  { name: 'Formations entreprise', value: 10 },
];

const AdminFinance = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("30j");
  
  // Mock transaction data
  const transactions = [
    { 
      id: "TX-78945",
      date: "05/05/2025",
      amount: "149.99€",
      type: "subscription",
      status: "completed",
      customer: "John Doe",
      description: "Abonnement Premium Mensuel"
    },
    { 
      id: "TX-78946",
      date: "04/05/2025",
      amount: "999.00€",
      type: "business",
      status: "completed",
      customer: "Acme Corporation",
      description: "Forfait Business (10 utilisateurs)"
    },
    { 
      id: "TX-78947",
      date: "03/05/2025",
      amount: "49.99€",
      type: "course",
      status: "completed",
      customer: "Marie Dupont",
      description: "Cours: Design UX/UI Avancé"
    },
    { 
      id: "TX-78948",
      date: "02/05/2025",
      amount: "149.99€",
      type: "subscription",
      status: "failed",
      customer: "Pierre Martin",
      description: "Abonnement Premium Mensuel"
    }
  ];

  // Finance summary data
  const financeSummary = {
    totalRevenue: "125,450€",
    monthlyRevenue: "28,750€",
    averageOrderValue: "89.99€",
    activePlans: 1245
  };

  const filteredTransactions = transactions.filter(transaction => 
    transaction.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    transaction.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    transaction.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Finance & Transactions</h2>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 w-full max-w-md mb-6">
          <TabsTrigger value="overview">
            <BarChart3 className="h-4 w-4 mr-2" />
            Vue d'ensemble
          </TabsTrigger>
          <TabsTrigger value="transactions">
            <CreditCard className="h-4 w-4 mr-2" />
            Transactions
          </TabsTrigger>
          <TabsTrigger value="reports">
            <Download className="h-4 w-4 mr-2" />
            Rapports
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Revenu Total
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">{financeSummary.totalRevenue}</div>
                  <TrendingUp className="h-4 w-4 text-emerald-500" />
                </div>
                <p className="text-xs text-emerald-500 mt-1">
                  +12.5% depuis le dernier mois
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Revenu Mensuel
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">{financeSummary.monthlyRevenue}</div>
                  <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Mai 2025
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Valeur Moyenne Commande
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">{financeSummary.averageOrderValue}</div>
                  <ArrowDownUp className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  30 derniers jours
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Abonnements Actifs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">{financeSummary.activePlans}</div>
                  <PieChart className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  +56 ce mois-ci
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Évolution du Revenu</CardTitle>
                  <Select defaultValue={dateFilter} onValueChange={setDateFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Période" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30j">30 derniers jours</SelectItem>
                      <SelectItem value="90j">90 derniers jours</SelectItem>
                      <SelectItem value="1an">12 derniers mois</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <CardDescription>
                  Revenus bruts par période
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={revenueData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" stroke="#0ea5e9" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Répartition des Ventes</CardTitle>
                <CardDescription>
                  Par type de produit
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    width={500}
                    height={300}
                    data={transactionTypeData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip />
                    <Bar dataKey="value" fill="#0ea5e9" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="transactions">
          <div className="flex items-center justify-between mb-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher une transaction..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex space-x-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous</SelectItem>
                  <SelectItem value="completed">Complété</SelectItem>
                  <SelectItem value="pending">En attente</SelectItem>
                  <SelectItem value="failed">Échoué</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                Période
              </Button>
              <Button variant="outline" className="flex items-center">
                <Download className="h-4 w-4 mr-2" />
                Exporter
              </Button>
            </div>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Montant</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Statut</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.map(transaction => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">{transaction.id}</TableCell>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>{transaction.amount}</TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={
                            transaction.type === "subscription" ? "bg-purple-50 text-purple-800" : 
                            transaction.type === "business" ? "bg-blue-50 text-blue-800" :
                            "bg-green-50 text-green-800"
                          }
                        >
                          {transaction.type === "subscription" ? "Abonnement" : 
                           transaction.type === "business" ? "Entreprise" : "Cours"}
                        </Badge>
                      </TableCell>
                      <TableCell>{transaction.customer}</TableCell>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={transaction.status === "completed" ? "default" : "destructive"}
                          className={
                            transaction.status === "completed" ? "bg-green-100 text-green-800" : 
                            "bg-red-100 text-red-800"
                          }
                        >
                          {transaction.status === "completed" ? "Complété" : "Échoué"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reports">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Rapport Mensuel</CardTitle>
                <CardDescription>
                  Synthèse des transactions de Mai 2025
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full flex items-center justify-center">
                  <Download className="h-4 w-4 mr-2" />
                  Télécharger (PDF)
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Rapport Trimestriel</CardTitle>
                <CardDescription>
                  Synthèse des transactions Q2 2025
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full flex items-center justify-center">
                  <Download className="h-4 w-4 mr-2" />
                  Télécharger (PDF)
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Rapport Fiscal</CardTitle>
                <CardDescription>
                  Données fiscales pour l'année 2025
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full flex items-center justify-center">
                  <Download className="h-4 w-4 mr-2" />
                  Télécharger (PDF)
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Rapports Personnalisés</CardTitle>
              <CardDescription>
                Générez des rapports sur mesure selon vos besoins
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Période</label>
                  <Select defaultValue="last_month">
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une période" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="this_month">Ce mois-ci</SelectItem>
                      <SelectItem value="last_month">Mois dernier</SelectItem>
                      <SelectItem value="this_quarter">Ce trimestre</SelectItem>
                      <SelectItem value="custom">Personnalisé</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Type de rapport</label>
                  <Select defaultValue="transactions">
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="transactions">Transactions</SelectItem>
                      <SelectItem value="subscriptions">Abonnements</SelectItem>
                      <SelectItem value="business">Entreprises</SelectItem>
                      <SelectItem value="courses">Ventes de cours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Button className="w-full mt-6">Générer Rapport</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminFinance;
