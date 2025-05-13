
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  AlertTriangle, CheckCircle2, Clock, Headphones,
  UserX, MessageSquare, Filter, ArrowUpDown, Eye, Shield
} from "lucide-react";

const UserSupport = () => {
  // Mock data for tickets
  const [tickets, setTickets] = useState([
    {
      id: "T-1234",
      user: "Marie Dupont",
      subject: "Problème d'accès à mon cours",
      category: "access",
      priority: "high",
      status: "open",
      createdAt: "2023-05-12T14:32:00Z",
      lastUpdated: "2023-05-12T15:45:00Z",
      messages: 3,
      assignedTo: null
    },
    {
      id: "T-1235",
      user: "Thomas Laurent",
      subject: "Erreur lors du paiement",
      category: "payment",
      priority: "high",
      status: "open",
      createdAt: "2023-05-12T10:15:00Z",
      lastUpdated: "2023-05-12T11:20:00Z",
      messages: 2,
      assignedTo: "Support Finance"
    },
    {
      id: "T-1232",
      user: "Lucas Martin",
      subject: "Question sur le certificat",
      category: "certificate",
      priority: "medium",
      status: "in_progress",
      createdAt: "2023-05-11T16:42:00Z",
      lastUpdated: "2023-05-12T09:15:00Z",
      messages: 4,
      assignedTo: "Emma"
    },
    {
      id: "T-1229",
      user: "Sophie Petit",
      subject: "Contenu incorrect dans le module 3",
      category: "content",
      priority: "medium",
      status: "in_progress",
      createdAt: "2023-05-11T11:23:00Z",
      lastUpdated: "2023-05-12T10:07:00Z",
      messages: 5,
      assignedTo: "Thomas"
    },
    {
      id: "T-1225",
      user: "Julien Bernard",
      subject: "Demande de remboursement",
      category: "refund",
      priority: "high",
      status: "open",
      createdAt: "2023-05-10T14:37:00Z",
      lastUpdated: "2023-05-11T08:22:00Z",
      messages: 2,
      assignedTo: null
    }
  ]);

  // Mock data for reported users
  const reportedUsers = [
    {
      id: "U-4321",
      user: "Jean Dupuis",
      role: "instructor",
      reason: "Contenu inapproprié",
      reports: 3,
      lastReported: "2023-05-12T15:30:00Z",
      status: "pending_review",
      action: null
    },
    {
      id: "U-4325",
      user: "Michel Leroy",
      role: "student",
      reason: "Comportement abusif dans les commentaires",
      reports: 2,
      lastReported: "2023-05-11T12:15:00Z",
      status: "pending_review",
      action: null
    },
    {
      id: "U-4318",
      user: "Laura Martin",
      role: "student",
      reason: "Spam dans les forums",
      reports: 5,
      lastReported: "2023-05-10T09:45:00Z",
      status: "suspended",
      action: "suspended_7_days"
    },
    {
      id: "U-4312",
      user: "Pierre Durand",
      role: "instructor",
      reason: "Violation de propriété intellectuelle",
      reports: 1,
      lastReported: "2023-05-09T16:22:00Z",
      status: "investigating",
      action: null
    }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getTimeSince = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds} secondes`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} heures`;
    return `${Math.floor(diffInSeconds / 86400)} jours`;
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Haute</Badge>;
      case "medium":
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">Moyenne</Badge>;
      case "low":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Basse</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">{priority}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Ouvert</Badge>;
      case "in_progress":
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">En cours</Badge>;
      case "closed":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Résolu</Badge>;
      case "pending_review":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">À examiner</Badge>;
      case "suspended":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Suspendu</Badge>;
      case "investigating":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Enquête</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">{status}</Badge>;
    }
  };

  const getCategoryBadge = (category: string) => {
    const categoryMap: Record<string, { label: string, color: string }> = {
      "access": { label: "Accès", color: "bg-blue-100 text-blue-800 hover:bg-blue-100" },
      "payment": { label: "Paiement", color: "bg-green-100 text-green-800 hover:bg-green-100" },
      "certificate": { label: "Certificat", color: "bg-purple-100 text-purple-800 hover:bg-purple-100" },
      "content": { label: "Contenu", color: "bg-indigo-100 text-indigo-800 hover:bg-indigo-100" },
      "refund": { label: "Remboursement", color: "bg-red-100 text-red-800 hover:bg-red-100" },
    };
    
    const { label, color } = categoryMap[category] || { label: category, color: "bg-gray-100 text-gray-800 hover:bg-gray-100" };
    return <Badge className={color}>{label}</Badge>;
  };

  const getActionButtons = (ticketId: string) => (
    <div className="flex gap-1">
      <Button size="sm" variant="outline" className="h-8 px-2 text-xs">
        <Eye className="h-3 w-3 mr-1" />
        Voir
      </Button>
      <Button size="sm" variant="outline" className="h-8 px-2 text-xs">
        <MessageSquare className="h-3 w-3 mr-1" />
        Répondre
      </Button>
    </div>
  );

  const getReportActionButtons = (userId: string, status: string) => (
    <div className="flex gap-1">
      <Button size="sm" variant="outline" className="h-8 px-2 text-xs">
        <Eye className="h-3 w-3 mr-1" />
        Détails
      </Button>
      {status !== "suspended" && (
        <Button size="sm" variant="outline" className="h-8 px-2 text-xs text-red-600 hover:text-red-700 hover:bg-red-50">
          <UserX className="h-3 w-3 mr-1" />
          Suspendre
        </Button>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold tracking-tight">Support & Signalements</h2>
      
      <Tabs defaultValue="tickets" className="space-y-4">
        <TabsList>
          <TabsTrigger value="tickets" className="flex items-center gap-2">
            <Headphones className="h-4 w-4" />
            Tickets support
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Utilisateurs signalés
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="tickets" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <div>
                  <CardTitle>Tickets de support</CardTitle>
                  <CardDescription>
                    Gérer les demandes d'assistance des utilisateurs
                  </CardDescription>
                </div>
                <div className="flex gap-2 flex-col sm:flex-row">
                  <Button variant="outline" size="sm" className="h-8 text-xs flex items-center gap-1">
                    <Filter className="h-3 w-3" />
                    Filtrer
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 text-xs flex items-center gap-1">
                    <ArrowUpDown className="h-3 w-3" />
                    Trier
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-4">
                  {tickets.map((ticket) => (
                    <div key={ticket.id} className="flex flex-col space-y-3 rounded-md border p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                          <span className="font-mono text-xs px-2 py-1 bg-gray-100 rounded dark:bg-gray-800">
                            {ticket.id}
                          </span>
                          <span className="font-medium">{ticket.subject}</span>
                        </div>
                        <div className="flex gap-1">
                          {getPriorityBadge(ticket.priority)}
                          {getStatusBadge(ticket.status)}
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm">
                        <div className="flex flex-col xs:flex-row gap-2 text-muted-foreground">
                          <span>De: <span className="font-medium text-foreground">{ticket.user}</span></span>
                          <div className="hidden xs:block">•</div>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            il y a {getTimeSince(ticket.lastUpdated)}
                          </span>
                          <div className="hidden xs:block">•</div>
                          {getCategoryBadge(ticket.category)}
                        </div>
                        
                        <div className="flex justify-between mt-2 sm:mt-0 w-full sm:w-auto">
                          <div className="flex items-center gap-1 text-xs">
                            <MessageSquare className="h-3 w-3" />
                            {ticket.messages} messages
                          </div>
                          <div className="sm:ml-4">
                            {getActionButtons(ticket.id)}
                          </div>
                        </div>
                      </div>
                      
                      {ticket.assignedTo && (
                        <div className="text-xs text-muted-foreground">
                          Assigné à: <span className="font-medium">{ticket.assignedTo}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <div>
                  <CardTitle>Utilisateurs signalés</CardTitle>
                  <CardDescription>
                    Gérer les utilisateurs signalés pour comportement inapproprié
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="h-8 text-xs flex items-center gap-1">
                    <Filter className="h-3 w-3" />
                    Filtrer
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-4">
                  {reportedUsers.map((user) => (
                    <div key={user.id} className="flex flex-col space-y-3 rounded-md border p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{user.user}</span>
                            <Badge variant="outline" className="capitalize">
                              {user.role === 'instructor' ? 'Instructeur' : user.role}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            <span className="font-semibold">Motif:</span> {user.reason}
                          </p>
                        </div>
                        <div>
                          {getStatusBadge(user.status)}
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm">
                        <div className="flex flex-col xs:flex-row gap-2 text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Shield className="h-3 w-3" />
                            {user.reports} signalement{user.reports > 1 ? 's' : ''}
                          </span>
                          <div className="hidden xs:block">•</div>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            Dernier: {formatDate(user.lastReported)}
                          </span>
                        </div>
                        
                        <div className="flex justify-end mt-2 sm:mt-0 w-full sm:w-auto">
                          {getReportActionButtons(user.id, user.status)}
                        </div>
                      </div>
                      
                      {user.action && (
                        <div className="text-xs font-medium text-red-600">
                          Action prise: {user.action.replace(/_/g, ' ')}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserSupport;
