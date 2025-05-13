
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Edit, Eye, Mail, Plus, Trash2 } from "lucide-react";

export const AdminEmailCampaigns = () => {
  const campaigns = [
    {
      id: "CAMP-001",
      name: "Newsletter Mai 2025",
      subject: "Découvrez nos nouveautés du mois de mai !",
      sentTo: "Tous les abonnés",
      sentDate: "2025-05-10",
      status: "sent",
      openRate: "32%",
      clickRate: "8%"
    },
    {
      id: "CAMP-002",
      name: "Promotion courses spéciales",
      subject: "50% sur toutes les formations tech !",
      sentTo: "Segment Tech",
      sentDate: "2025-05-15",
      status: "scheduled",
      openRate: "-",
      clickRate: "-"
    },
    {
      id: "CAMP-003",
      name: "Rappel webinaire",
      subject: "Ne manquez pas notre webinaire demain",
      sentTo: "Inscrits webinaire",
      sentDate: "2025-05-18",
      status: "scheduled",
      openRate: "-",
      clickRate: "-"
    },
    {
      id: "CAMP-004",
      name: "Bienvenue nouveaux membres",
      subject: "Bienvenue sur Schoolier !",
      sentTo: "Nouveaux inscrits",
      sentDate: "automatique",
      status: "active",
      openRate: "64%",
      clickRate: "24%"
    },
    {
      id: "CAMP-005",
      name: "Récupération d'abandon",
      subject: "Vous avez oublié quelque chose ?",
      sentTo: "Paniers abandonnés",
      sentDate: "automatique",
      status: "active",
      openRate: "45%",
      clickRate: "18%"
    }
  ];

  const renderStatus = (status: string) => {
    switch (status) {
      case "sent":
        return <Badge className="bg-green-500">Envoyé</Badge>;
      case "scheduled":
        return <Badge variant="outline" className="text-yellow-600 border-yellow-600">Programmé</Badge>;
      case "draft":
        return <Badge variant="outline" className="text-gray-500 border-gray-500">Brouillon</Badge>;
      case "active":
        return <Badge className="bg-blue-500">Automatique</Badge>;
      default:
        return null;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
        <div>
          <h2 className="text-xl font-semibold">Campagnes emails</h2>
          <p className="text-muted-foreground">Créez et gérez vos campagnes d'emailing</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-1">
            <Copy className="h-4 w-4" />
            Modèles
          </Button>
          <Button className="gap-1 bg-schoolier-teal hover:bg-schoolier-dark-teal">
            <Plus className="h-4 w-4" />
            Nouvelle campagne
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Mail className="h-5 w-5 mr-2 text-schoolier-blue" />
            Campagnes emails
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nom</TableHead>
                <TableHead>Sujet</TableHead>
                <TableHead>Audience</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Taux ouverture</TableHead>
                <TableHead>Taux clic</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaigns.map((campaign) => (
                <TableRow key={campaign.id}>
                  <TableCell className="font-medium">{campaign.id}</TableCell>
                  <TableCell>{campaign.name}</TableCell>
                  <TableCell className="max-w-[200px] truncate">{campaign.subject}</TableCell>
                  <TableCell>{campaign.sentTo}</TableCell>
                  <TableCell>{campaign.sentDate}</TableCell>
                  <TableCell>{campaign.openRate}</TableCell>
                  <TableCell>{campaign.clickRate}</TableCell>
                  <TableCell>{renderStatus(campaign.status)}</TableCell>
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
            <CardTitle>Performance des emails</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-muted-foreground">
                <p>Statistiques en développement</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Emails automatiques</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-md">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                  <span>Bienvenue nouveaux membres</span>
                </div>
                <Badge className="bg-blue-500">Actif</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-md">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                  <span>Récupération d'abandon</span>
                </div>
                <Badge className="bg-blue-500">Actif</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-gray-500 mr-2"></div>
                  <span>Confirmation de commande</span>
                </div>
                <Badge variant="outline" className="text-gray-500 border-gray-500">Inactif</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-gray-500 mr-2"></div>
                  <span>Rappel de cours</span>
                </div>
                <Badge variant="outline" className="text-gray-500 border-gray-500">Inactif</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
