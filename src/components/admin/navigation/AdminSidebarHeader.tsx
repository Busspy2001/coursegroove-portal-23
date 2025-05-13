
import React from 'react';
import { SidebarHeader, SidebarTrigger } from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface AdminSidebarHeaderProps {
  name: string;
  avatar?: string;
  role: string;
}

const AdminSidebarHeader: React.FC<AdminSidebarHeaderProps> = ({ 
  name, 
  avatar, 
  role 
}) => {
  const getInitials = (name: string = "Admin") => {
    return name.split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <SidebarHeader className="flex items-center gap-2 p-4">
      <Avatar className="h-10 w-10">
        <AvatarImage src={avatar} alt={name || "Admin"} />
        <AvatarFallback>{getInitials(name)}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span className="font-medium text-sm">{name || "Admin"}</span>
        <span className="text-xs text-muted-foreground capitalize">{role || "admin"}</span>
      </div>
      <SidebarTrigger className="ml-auto" />
    </SidebarHeader>
  );
};

export default AdminSidebarHeader;
