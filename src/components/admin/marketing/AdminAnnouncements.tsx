
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Eye, Megaphone, Plus, Target, Trash2 } from "lucide-react";

export const AdminAnnouncements = () => {
  const announcements = [
    {
      id: "ANN-001",
      title: "Nouvelles certifications disponibles",
      target: "Étudiants actifs",
      date: "2025-05-15",
      status: "scheduled",
      reach: "15,240"
    },
    {
      id: "ANN-002",
      title: "Mise à jour de la plateforme",
      target: "Tous les utilisateurs",
      date: "2025-05-08",
      status: "sent",
      reach: "42,782"
    },
    {
      id: "ANN-003",
      title: "Offre spéciale instructeurs",
      target: "Instructeurs",
      date: "2025-05-01",
      status: "sent",
      reach: "428"
    },
    {
      id: "ANN-004",
      title: "Webinaire Marketing Digital",
      target: "Étudiants en marketing",
      date: "2025-05-20",
      status: "scheduled",
      reach: "4,890"
    },
    {
      id: "ANN-005",
      title: "Promotion Été 2025",
      target: "Utilisateurs inactifs",
      date: "2025-06-01",
      status: "draft",
      reach: "~28,560"
    }
  ];

  const renderStatus = (status: string) => {
    switch (status) {
      case "sent":
        return <Badge className="bg-green-500">Envoyée</Badge>;
      case "scheduled":
        return <Badge variant="outline" className="text-yellow-600 border-yellow-600">Programmée</Badge>;
      case "draft":
        return <Badge variant="outline" className="text-gray-500 border-gray-500">Brouillon</Badge>;
      default:
        return null;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
        <div>
          <h2 className="text-xl font-semibold">Annonces ciblées</h2>
          <p className="text-muted-foreground">Gérez les communications ciblées pour vos utilisateurs</p>
        </div>
        <Button className="gap-1 bg-schoolier-teal hover:bg-schoolier-dark-teal">
          <Plus className="h-4 w-4" />
          Nouvelle annonce
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Megaphone className="h-5 w-5 mr-2 text-schoolier-blue" />
            Annonces récentes et programmées
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Titre</TableHead>
                <TableHead>Public cible</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Portée</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {announcements.map((announcement) => (
                <TableRow key={announcement.id}>
                  <TableCell className="font-medium">{announcement.id}</TableCell>
                  <TableCell>{announcement.title}</TableCell>
                  <TableCell>{announcement.target}</TableCell>
                  <TableCell>{announcement.date}</TableCell>
                  <TableCell>{announcement.reach}</TableCell>
                  <TableCell>{renderStatus(announcement.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">Voir</span>
                      </Button>
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
            <CardTitle className="flex items-center">
              <Target className="h-5 w-5 mr-2 text-schoolier-teal" />
              Segmentation audience
            </CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-muted-foreground">
                <p>Outil de segmentation en développement</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Performance des annonces</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-muted-foreground">
                <p>Statistiques en développement</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
