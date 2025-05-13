
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  Filter, 
  Plus, 
  MoreHorizontal, 
  User, 
  Shield,
  UserCog 
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Type d'utilisateur pour la gestion
interface AdminUserManagementUser {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'suspended';
  joinedDate: string;
  lastActive: string;
  avatarUrl?: string;
}

const AdminUserManagement = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  
  // Données mock - à remplacer par des données provenant de Supabase
  const mockUsers: AdminUserManagementUser[] = [
    { 
      id: '1', 
      name: 'Alice Dupont', 
      email: 'alice@example.com', 
      role: 'student', 
      status: 'active', 
      joinedDate: '15/03/2023', 
      lastActive: 'Il y a 2h',
      avatarUrl: 'https://api.dicebear.com/6.x/personas/svg?seed=Alice'
    },
    { 
      id: '2', 
      name: 'Pierre Martin', 
      email: 'pierre@example.com', 
      role: 'instructor', 
      status: 'active', 
      joinedDate: '10/01/2023', 
      lastActive: 'Il y a 5j',
      avatarUrl: 'https://api.dicebear.com/6.x/personas/svg?seed=Pierre' 
    },
    { 
      id: '3', 
      name: 'Sophie Bernard', 
      email: 'sophie@example.com', 
      role: 'student', 
      status: 'inactive', 
      joinedDate: '23/05/2023', 
      lastActive: 'Il y a 2m',
      avatarUrl: 'https://api.dicebear.com/6.x/personas/svg?seed=Sophie' 
    },
    { 
      id: '4', 
      name: 'Thomas Laurent', 
      email: 'thomas@example.com', 
      role: 'admin', 
      status: 'active', 
      joinedDate: '03/11/2022', 
      lastActive: 'Il y a 1h',
      avatarUrl: 'https://api.dicebear.com/6.x/personas/svg?seed=Thomas' 
    },
    { 
      id: '5', 
      name: 'Julie Moreau', 
      email: 'julie@example.com', 
      role: 'student', 
      status: 'suspended', 
      joinedDate: '07/07/2023', 
      lastActive: 'Il y a 3m',
      avatarUrl: 'https://api.dicebear.com/6.x/personas/svg?seed=Julie' 
    }
  ];
  
  // Filtrage des utilisateurs selon les critères
  const filteredUsers = mockUsers.filter(user => {
    // Filtrage par onglet (statut)
    if (activeTab !== 'all' && user.status !== activeTab) return false;
    
    // Filtrage par rôle
    if (roleFilter !== 'all' && user.role !== roleFilter) return false;
    
    // Recherche par nom ou email
    if (searchQuery && !user.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !user.email.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });
  
  // Fonction pour obtenir le badge de statut
  const getUserStatusBadge = (status: string) => {
    switch(status) {
      case 'active':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">Actif</Badge>;
      case 'inactive':
        return <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-300">Inactif</Badge>;
      case 'suspended':
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">Suspendu</Badge>;
      default:
        return <Badge variant="outline">Inconnu</Badge>;
    }
  };
  
  // Fonction pour obtenir le badge de rôle
  const getUserRoleBadge = (role: string) => {
    switch(role) {
      case 'student':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300 flex items-center gap-1">
          <User className="h-3 w-3" />Étudiant
        </Badge>;
      case 'instructor':
        return <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-300 flex items-center gap-1">
          <UserCog className="h-3 w-3" />Instructeur
        </Badge>;
      case 'admin':
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-300 flex items-center gap-1">
          <Shield className="h-3 w-3" />Admin
        </Badge>;
      case 'super_admin':
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300 flex items-center gap-1">
          <Shield className="h-3 w-3" />Super Admin
        </Badge>;
      default:
        return <Badge variant="outline">{role}</Badge>;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold tracking-tight">Gestion des utilisateurs</h2>
        
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nouvel utilisateur
        </Button>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Utilisateurs</CardTitle>
          <CardDescription>
            Gérez les comptes de tous les utilisateurs de la plateforme
          </CardDescription>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-2">
            <TabsList>
              <TabsTrigger value="all">Tous</TabsTrigger>
              <TabsTrigger value="active">Actifs</TabsTrigger>
              <TabsTrigger value="inactive">Inactifs</TabsTrigger>
              <TabsTrigger value="suspended">Suspendus</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        
        <CardContent>
          <div className="flex gap-3 mb-4 flex-col sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Rechercher un utilisateur..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            
            <div className="flex gap-3">
              <Select
                value={roleFilter}
                onValueChange={setRoleFilter}
              >
                <SelectTrigger className="w-[180px]">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <SelectValue placeholder="Filtrer par rôle" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les rôles</SelectItem>
                  <SelectItem value="student">Étudiants</SelectItem>
                  <SelectItem value="instructor">Instructeurs</SelectItem>
                  <SelectItem value="admin">Administrateurs</SelectItem>
                  <SelectItem value="super_admin">Super Admins</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Utilisateur</TableHead>
                  <TableHead>Rôle</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Date d'inscription</TableHead>
                  <TableHead>Dernière activité</TableHead>
                  <TableHead className="w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={user.avatarUrl} alt={user.name} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span className="font-medium">{user.name}</span>
                            <span className="text-xs text-muted-foreground">{user.email}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getUserRoleBadge(user.role)}</TableCell>
                      <TableCell>{getUserStatusBadge(user.status)}</TableCell>
                      <TableCell>{user.joinedDate}</TableCell>
                      <TableCell>{user.lastActive}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      Aucun utilisateur trouvé.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminUserManagement;
