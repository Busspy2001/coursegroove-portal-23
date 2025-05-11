
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import InstructorSidebar from "@/components/instructor/InstructorSidebar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Loader2, 
  Download, 
  Calendar, 
  DollarSign, 
  CreditCard, 
  TrendingUp, 
  Filter, 
  ChevronRight,
  AlertCircle
} from "lucide-react";
import { 
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const InstructorEarnings = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [period, setPeriod] = React.useState("month");
  const [year, setYear] = React.useState("2025");

  // Rediriger si pas authentifié ou pas un instructeur
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else if (currentUser?.role !== "instructor") {
      navigate("/dashboard");
    }
  }, [isAuthenticated, currentUser, navigate]);

  if (!isAuthenticated || currentUser?.role !== "instructor") {
    return null;
  }

  // Mock data for earnings
  const earningsData = [
    { month: 'Jan', revenue: 1350 },
    { month: 'Fév', revenue: 1680 },
    { month: 'Mar', revenue: 2100 },
    { month: 'Avr', revenue: 2450 },
    { month: 'Mai', revenue: 2800 },
    { month: 'Juin', revenue: 3100 },
    { month: 'Juil', revenue: 3350 },
    { month: 'Août', revenue: 3200 },
    { month: 'Sep', revenue: 3600 },
    { month: 'Oct', revenue: 3950 },
    { month: 'Nov', revenue: 4200 },
    { month: 'Déc', revenue: 4720 },
  ];

  const revenueBreakdown = [
    { name: 'JavaScript Moderne', value: 6250 },
    { name: 'Fondamentaux Web', value: 2610 },
    { name: 'React Débutant', value: 1520 },
    { name: 'Python Data Science', value: 2640 },
  ];

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#6366F1'];
  
  const transactions = [
    { 
      id: "INV-2025042",
      date: "10/04/2025", 
      amount: 1274.50,
      status: "completed", 
      method: "bank_transfer",
      courses: 4,
      students: 17
    },
    { 
      id: "INV-2025037",
      date: "10/03/2025", 
      amount: 1158.75,
      status: "completed", 
      method: "bank_transfer",
      courses: 3,
      students: 15
    },
    { 
      id: "INV-2025029",
      date: "10/02/2025", 
      amount: 932.20,
      status: "completed", 
      method: "bank_transfer",
      courses: 4,
      students: 12
    },
    { 
      id: "INV-2025018",
      date: "10/01/2025", 
      amount: 845.30,
      status: "completed", 
      method: "bank_transfer",
      courses: 3,
      students: 11
    },
    { 
      id: "INV-2024128",
      date: "10/12/2024", 
      amount: 768.45,
      status: "completed", 
      method: "bank_transfer",
      courses: 3,
      students: 10
    },
  ];
  
  const currentBalance = 468.25;
  const nextPayoutDate = "10/05/2025";
  const estimatedNextPayout = 1350;

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container flex-grow flex items-center justify-center">
          <div className="flex flex-col items-center">
            <Loader2 className="h-10 w-10 text-schoolier-blue animate-spin mb-4" />
            <p className="text-muted-foreground">Chargement des données financières...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full">
        <InstructorSidebar />
        
        <SidebarInset>
          <Navbar />
          
          <div className="container px-6 py-8 flex-grow">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold">Revenus</h1>
                <p className="text-muted-foreground">
                  Suivez et gérez vos revenus et paiements
                </p>
              </div>
              <div className="flex gap-4 mt-4 md:mt-0">
                <Select value={year} onValueChange={setYear}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Année" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2025">2025</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="flex items-center">
                  <Download className="mr-2 h-4 w-4" />
                  Exporter
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Solde actuel</p>
                      <h3 className="text-3xl font-bold mt-1">{currentBalance} €</h3>
                      <div className="flex items-center mt-3">
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          En attente du prochain paiement
                        </Badge>
                      </div>
                    </div>
                    <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                      <DollarSign className="h-7 w-7 text-blue-700" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Prochain paiement</p>
                      <h3 className="text-3xl font-bold mt-1">{estimatedNextPayout} €</h3>
                      <div className="flex items-center mt-3 gap-1 text-muted-foreground text-sm">
                        <Calendar className="h-4 w-4" />
                        <span>Prévu le {nextPayoutDate}</span>
                      </div>
                    </div>
                    <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
                      <CreditCard className="h-7 w-7 text-green-700" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total des revenus (2025)</p>
                      <h3 className="text-3xl font-bold mt-1">36 500 €</h3>
                      <div className="flex items-center mt-3 gap-1 text-green-600 text-sm">
                        <TrendingUp className="h-4 w-4" />
                        <span>+23% vs 2024</span>
                      </div>
                    </div>
                    <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full">
                      <TrendingUp className="h-7 w-7 text-purple-700" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Revenus mensuels</CardTitle>
                  <CardDescription>Évolution de vos revenus sur l'année {year}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={earningsData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip
                          formatter={(value) => [`${value} €`, "Revenus"]}
                          labelFormatter={(label) => `${label} ${year}`}
                        />
                        <Bar dataKey="revenue" fill="#3B82F6" name="Revenus (€)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Répartition par cours</CardTitle>
                  <CardDescription>Revenus générés par cours en {year}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={revenueBreakdown}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          fill="#8884d8"
                          paddingAngle={2}
                          dataKey="value"
                          label={({name, percent}) => `${(percent * 100).toFixed(0)}%`}
                        >
                          {revenueBreakdown.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value} €`, "Revenus"]} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-6 space-y-2">
                    {revenueBreakdown.map((course, index) => (
                      <div key={course.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: COLORS[index % COLORS.length] }} 
                          />
                          <span className="text-sm truncate max-w-[180px]">{course.name}</span>
                        </div>
                        <span className="font-medium">{course.value} €</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="mb-8">
              <CardHeader className="pb-3">
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                  <CardTitle>Historique des paiements</CardTitle>
                  <div className="flex gap-4 w-full md:w-auto">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-full md:w-[180px]">
                        <SelectValue placeholder="Toutes les périodes" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Toutes les périodes</SelectItem>
                        <SelectItem value="2025">2025</SelectItem>
                        <SelectItem value="2024">2024</SelectItem>
                        <SelectItem value="2023">2023</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" className="flex items-center">
                      <Filter className="mr-2 h-4 w-4" />
                      Filtres
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="transactions" className="w-full">
                  <TabsList className="mb-6">
                    <TabsTrigger value="transactions">Transactions</TabsTrigger>
                    <TabsTrigger value="statements">Relevés</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="transactions">
                    <div className="rounded-md border overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[120px]">ID</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Montant</TableHead>
                            <TableHead>Méthode</TableHead>
                            <TableHead>Cours</TableHead>
                            <TableHead>Étudiants</TableHead>
                            <TableHead>Statut</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {transactions.map((transaction) => (
                            <TableRow key={transaction.id}>
                              <TableCell className="font-medium">{transaction.id}</TableCell>
                              <TableCell>{transaction.date}</TableCell>
                              <TableCell>{transaction.amount} €</TableCell>
                              <TableCell>
                                {transaction.method === "bank_transfer" ? "Virement bancaire" : "Autre"}
                              </TableCell>
                              <TableCell>{transaction.courses}</TableCell>
                              <TableCell>{transaction.students}</TableCell>
                              <TableCell>
                                {transaction.status === "completed" ? (
                                  <div className="flex items-center">
                                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                                    <span>Complété</span>
                                  </div>
                                ) : (
                                  <div className="flex items-center">
                                    <span className="h-2 w-2 rounded-full bg-yellow-500 mr-2"></span>
                                    <span>En cours</span>
                                  </div>
                                )}
                              </TableCell>
                              <TableCell className="text-right">
                                <Button variant="ghost" size="icon">
                                  <ChevronRight className="h-4 w-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="statements">
                    <div className="rounded-md border overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Période</TableHead>
                            <TableHead>Revenus</TableHead>
                            <TableHead>Commission</TableHead>
                            <TableHead>Net payé</TableHead>
                            <TableHead>Date de paiement</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">Avril 2025</TableCell>
                            <TableCell>1274.50 €</TableCell>
                            <TableCell>254.90 €</TableCell>
                            <TableCell>1019.60 €</TableCell>
                            <TableCell>10/04/2025</TableCell>
                            <TableCell className="text-right">
                              <Button variant="outline" size="sm" className="flex items-center">
                                <Download className="mr-2 h-4 w-4" />
                                PDF
                              </Button>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Mars 2025</TableCell>
                            <TableCell>1158.75 €</TableCell>
                            <TableCell>231.75 €</TableCell>
                            <TableCell>927.00 €</TableCell>
                            <TableCell>10/03/2025</TableCell>
                            <TableCell className="text-right">
                              <Button variant="outline" size="sm" className="flex items-center">
                                <Download className="mr-2 h-4 w-4" />
                                PDF
                              </Button>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Février 2025</TableCell>
                            <TableCell>932.20 €</TableCell>
                            <TableCell>186.44 €</TableCell>
                            <TableCell>745.76 €</TableCell>
                            <TableCell>10/02/2025</TableCell>
                            <TableCell className="text-right">
                              <Button variant="outline" size="sm" className="flex items-center">
                                <Download className="mr-2 h-4 w-4" />
                                PDF
                              </Button>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Janvier 2025</TableCell>
                            <TableCell>845.30 €</TableCell>
                            <TableCell>169.06 €</TableCell>
                            <TableCell>676.24 €</TableCell>
                            <TableCell>10/01/2025</TableCell>
                            <TableCell className="text-right">
                              <Button variant="outline" size="sm" className="flex items-center">
                                <Download className="mr-2 h-4 w-4" />
                                PDF
                              </Button>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Décembre 2024</TableCell>
                            <TableCell>768.45 €</TableCell>
                            <TableCell>153.69 €</TableCell>
                            <TableCell>614.76 €</TableCell>
                            <TableCell>10/12/2024</TableCell>
                            <TableCell className="text-right">
                              <Button variant="outline" size="sm" className="flex items-center">
                                <Download className="mr-2 h-4 w-4" />
                                PDF
                              </Button>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
            
            <Card className="bg-amber-50 border-amber-200">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-amber-100 p-3 rounded-full">
                    <AlertCircle className="h-6 w-6 text-amber-700" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-1">Informations fiscales</h3>
                    <p className="text-muted-foreground mb-4">
                      N'oubliez pas que les revenus générés sur Schoolier sont soumis à l'impôt sur le revenu. 
                      Nous vous recommandons de consulter un expert-comptable pour optimiser votre situation fiscale.
                    </p>
                    <Button variant="outline" className="border-amber-300 bg-amber-100 hover:bg-amber-200">
                      Guide fiscal des instructeurs
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Footer />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default InstructorEarnings;
