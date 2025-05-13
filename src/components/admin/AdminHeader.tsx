
import React from 'react';
import { UserRole } from '@/contexts/auth/types';
import { Badge } from '@/components/ui/badge';
import { Crown, User } from 'lucide-react';

interface AdminHeaderProps {
  name: string;
  role: UserRole;
}

const getRoleBadge = (role: UserRole) => {
  switch (role) {
    case 'super_admin':
      return (
        <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-300 flex items-center gap-1">
          <Crown className="h-3 w-3" />
          Super Admin
        </Badge>
      );
    case 'admin':
      return (
        <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">
          Admin
        </Badge>
      );
    case 'business_admin':
      return (
        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
          Business Admin
        </Badge>
      );
    default:
      return (
        <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-300">
          {role}
        </Badge>
      );
  }
};

const AdminHeader = ({ name, role }: AdminHeaderProps) => {
  const formattedDate = new Date().toLocaleDateString('fr-FR', { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });
  
  // Capitaliser la première lettre du jour
  const capitalizedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold tracking-tight">Tableau de bord Admin</h1>
        {getRoleBadge(role)}
      </div>
      <div className="flex items-center text-muted-foreground">
        <p>
          Bonjour <span className="font-medium text-foreground">{name}</span>, {capitalizedDate}
        </p>
      </div>
    </div>
  );
};

export default AdminHeader;
