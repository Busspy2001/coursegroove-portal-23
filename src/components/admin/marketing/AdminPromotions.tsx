
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Edit, Trash2, Plus } from "lucide-react";

export const AdminPromotions = () => {
  const promotions = [
    {
      id: "PROMO-001",
      name: "Rentrée 2025",
      discount: "25%",
      startDate: "2025-09-01",
      endDate: "2025-09-15",
      status: "scheduled",
      courses: "Tous"
    },
    {
      id: "PROMO-002",
      name: "Été spécial",
      discount: "50%",
      startDate: "2025-06-15",
      endDate: "2025-07-15",
      status: "active",
      courses: "Programmation, Design"
    },
    {
      id: "PROMO-003",
      name: "Black Friday",
      discount: "40%",
      startDate: "2025-11-25",
      endDate: "2025-12-01",
      status: "scheduled",
      courses: "Tous"
    },
    {
      id: "PROMO-004",
      name: "Nouveaux membres",
      discount: "15%",
      startDate: "2025-01-01",
      endDate: "2025-12-31",
      status: "active",
      courses: "Sélection débutants"
    },
    {
      id: "PROMO-005",
      name: "Certifications Pro",
      discount: "30%",
      startDate: "2025-04-01",
      endDate: "2025-05-01",
      status: "expired",
      courses: "Certifications"
    }
  ];

  const renderStatus = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>;
      case "scheduled":
        return <Badge variant="outline" className="text-yellow-600 border-yellow-600">Programmée</Badge>;
      case "expired":
        return <Badge variant="outline" className="text-gray-500 border-gray-500">Expirée</Badge>;
      default:
        return null;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
        <div>
          <h2 className="text-xl font-semibold">Gestion des promotions</h2>
          <p className="text-muted-foreground">Créez et gérez les réductions et offres spéciales</p>
        </div>
        <Button className="gap-1 bg-schoolier-teal hover:bg-schoolier-dark-teal">
          <Plus className="h-4 w-4" />
          Nouvelle promotion
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-schoolier-blue" />
            Promotions actives et programmées
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nom</TableHead>
                <TableHead>Remise</TableHead>
                <TableHead>Date début</TableHead>
                <TableHead>Date fin</TableHead>
                <TableHead>Cours</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {promotions.map((promo) => (
                <TableRow key={promo.id}>
                  <TableCell className="font-medium">{promo.id}</TableCell>
                  <TableCell>{promo.name}</TableCell>
                  <TableCell>{promo.discount}</TableCell>
                  <TableCell>{promo.startDate}</TableCell>
                  <TableCell>{promo.endDate}</TableCell>
                  <TableCell>{promo.courses}</TableCell>
                  <TableCell>{renderStatus(promo.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Modifier</span>
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Supprimer</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Performance des promotions</CardTitle>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <p>Graphique en développement</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Utilisation des codes promo</CardTitle>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <p>Graphique en développement</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
