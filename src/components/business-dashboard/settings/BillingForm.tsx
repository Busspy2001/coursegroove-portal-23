
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { 
  CreditCard, 
  Download, 
  Calendar, 
  CheckCircle, 
  ChevronRight,
  Users
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const BillingForm = () => {
  const invoices = [
    { id: 'INV-001', date: '01/06/2025', amount: '€1,200.00', status: 'Payée' },
    { id: 'INV-002', date: '01/05/2025', amount: '€1,200.00', status: 'Payée' },
    { id: 'INV-003', date: '01/04/2025', amount: '€1,200.00', status: 'Payée' },
    { id: 'INV-004', date: '01/03/2025', amount: '€1,000.00', status: 'Payée' },
    { id: 'INV-005', date: '01/02/2025', amount: '€1,000.00', status: 'Payée' },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Abonnement actuel</CardTitle>
          <CardDescription>
            Gérez votre abonnement et accédez à vos factures
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-lg border p-6 bg-gray-50">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <Badge className="mb-2 bg-blue-500">Business Pro</Badge>
                <h3 className="text-2xl font-bold">€1,200.00 / mois</h3>
                <p className="text-sm text-muted-foreground">
                  Prochaine facturation le 1er juillet 2025
                </p>
              </div>
              <div>
                <Button variant="outline" className="mr-2">Changer de forfait</Button>
                <Button>Gérer le paiement</Button>
              </div>
            </div>
            
            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                  <p className="text-sm">Utilisateurs actifs</p>
                </div>
                <div className="text-sm">
                  <span className="font-medium">120</span> / 150
                </div>
              </div>
              <Progress value={80} />
              
              <div className="pt-2 text-xs text-muted-foreground text-right">
                30 licences disponibles
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h3 className="text-lg font-medium">Mode de paiement</h3>
              <Button variant="outline">
                Modifier le mode de paiement
              </Button>
            </div>
            
            <div className="flex items-center space-x-4 border p-4 rounded-lg">
              <div className="rounded-full bg-gray-100 p-2">
                <CreditCard className="h-6 w-6" />
              </div>
              <div>
                <p className="font-medium">Carte de crédit •••• 4242</p>
                <p className="text-sm text-muted-foreground">Expire en 12/2026</p>
              </div>
              <CheckCircle className="h-5 w-5 text-green-500 ml-auto" />
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Historique des factures</h3>
              
              <div className="flex items-center gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Filtrer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les factures</SelectItem>
                    <SelectItem value="paid">Payées</SelectItem>
                    <SelectItem value="pending">En attente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Facture</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Montant</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell>{invoice.id}</TableCell>
                      <TableCell>{invoice.date}</TableCell>
                      <TableCell>{invoice.amount}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          {invoice.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" className="ml-auto">
                          <Download className="h-4 w-4" />
                          <span className="sr-only">Télécharger</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Plans disponibles</CardTitle>
          <CardDescription>
            Comparez les différents plans et choisissez celui qui correspond à vos besoins
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-6 bg-gray-50">
              <Badge className="mb-2">Standard</Badge>
              <h3 className="text-2xl font-bold">€500.00 <span className="text-sm font-normal text-muted-foreground">/ mois</span></h3>
              <p className="text-sm text-muted-foreground mt-2 mb-4">
                Pour les petites entreprises
              </p>
              <ul className="space-y-2 text-sm mb-6">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Jusqu'à 50 utilisateurs
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Accès au catalogue de base
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Rapports mensuels
                </li>
              </ul>
              <Button variant="outline" className="w-full">
                Sélectionner
              </Button>
            </div>
            
            <div className="border rounded-lg p-6 bg-blue-50 border-blue-200">
              <div className="flex items-center justify-between mb-2">
                <Badge className="bg-blue-500">Business Pro</Badge>
                <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
                  Actuel
                </Badge>
              </div>
              <h3 className="text-2xl font-bold">€1,200.00 <span className="text-sm font-normal text-muted-foreground">/ mois</span></h3>
              <p className="text-sm text-muted-foreground mt-2 mb-4">
                Pour les entreprises en croissance
              </p>
              <ul className="space-y-2 text-sm mb-6">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Jusqu'à 150 utilisateurs
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Accès au catalogue complet
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Rapports avancés
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Support prioritaire
                </li>
              </ul>
              <Button className="w-full bg-blue-600">
                Plan actuel
              </Button>
            </div>
            
            <div className="border rounded-lg p-6 bg-gray-50">
              <Badge className="mb-2">Enterprise</Badge>
              <h3 className="text-2xl font-bold">Sur mesure</h3>
              <p className="text-sm text-muted-foreground mt-2 mb-4">
                Pour les grandes entreprises
              </p>
              <ul className="space-y-2 text-sm mb-6">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Utilisateurs illimités
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Intégration SSO & LDAP
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Contenu personnalisé
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Gestionnaire de compte dédié
                </li>
              </ul>
              <Button variant="outline" className="w-full">
                Contacter les ventes
              </Button>
            </div>
          </div>
          
          <Button variant="link" className="text-sm pl-0 pr-0">
            Voir les détails complets des plans
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
