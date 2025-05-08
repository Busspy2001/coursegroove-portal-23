
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
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, MoreHorizontal, UserCog, Shield, UserX, Trash } from "lucide-react";

const AdminUserManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock user data - in a real implementation, this would come from Supabase
  const users = [
    { 
      id: 1, 
      name: "Jean Dupont", 
      email: "jean.dupont@example.com", 
      role: "student", 
      status: "active",
      joined: "15/04/2025",
      courses: 3,
      lastLogin: "25/04/2025"
    },
    { 
      id: 2, 
      name: "Marie Curie", 
      email: "marie.curie@example.com", 
      role: "instructor", 
      status: "active",
      joined: "12/01/2025", 
      courses: 4,
      lastLogin: "05/05/2025"
    },
    { 
      id: 3, 
      name: "Paul Eluard", 
      email: "paul.eluard@example.com", 
      role: "student", 
      status: "inactive",
      joined: "20/02/2025", 
      courses: 0,
      lastLogin: "21/02/2025"
    },
    { 
      id: 4, 
      name: "Sophie Germain", 
      email: "sophie.germain@example.com", 
      role: "instructor", 
      status: "active",
      joined: "05/03/2025", 
      courses: 2,
      lastLogin: "03/05/2025"
    },
    { 
      id: 5, 
      name: "Lucas Bernard", 
      email: "lucas.bernard@example.com", 
      role: "admin", 
      status: "active",
      joined: "10/01/2025", 
      courses: 0,
      lastLogin: "06/05/2025"
    },
  ];

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "admin": return "destructive";
      case "instructor": return "default";
      case "student": return "outline";
      default: return "secondary";
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "active": return "success";
      case "inactive": return "secondary";
      case "suspended": return "destructive";
      default: return "outline";
    }
  };

  const getBadgeVariant = (variant: string) => {
    switch (variant) {
      case "success": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "secondary": return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
      case "destructive": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Gestion des utilisateurs</h2>
      
      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher par nom ou email..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">Filtrer</Button>
          <Button>+ Nouvel utilisateur</Button>
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="relative w-full overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Utilisateur</TableHead>
                <TableHead>Rôle</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Date d'inscription</TableHead>
                <TableHead>Cours</TableHead>
                <TableHead>Dernière connexion</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map(user => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className="h-8 w-8 rounded-full bg-schoolier-teal flex items-center justify-center text-white font-medium">
                        {user.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium">{user.name}</span>
                        <span className="text-xs text-muted-foreground">{user.email}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getRoleBadgeVariant(user.role) as any} className={getBadgeVariant(getRoleBadgeVariant(user.role))}>
                      {user.role === "admin" ? "Administrateur" : 
                       user.role === "instructor" ? "Instructeur" : "Étudiant"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(user.status) as any} className={getBadgeVariant(getStatusBadgeVariant(user.status))}>
                      {user.status === "active" ? "Actif" : "Inactif"}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.joined}</TableCell>
                  <TableCell>{user.courses}</TableCell>
                  <TableCell>{user.lastLogin}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="cursor-pointer">
                          <UserCog className="h-4 w-4 mr-2" />
                          Modifier rôle
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <Shield className="h-4 w-4 mr-2" />
                          {user.status === "active" ? "Désactiver" : "Activer"}
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <UserX className="h-4 w-4 mr-2" />
                          Suspendre
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer text-red-600 dark:text-red-400">
                          <Trash className="h-4 w-4 mr-2" />
                          Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredUsers.length === 0 && (
            <div className="py-8 text-center text-muted-foreground">
              Aucun utilisateur trouvé pour cette recherche.
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default AdminUserManagement;
