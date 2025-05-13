
import React from "react";
import { UserRole } from "@/types/database";

interface AdminHeaderProps {
  role: UserRole | null;
  name: string | undefined;
}

const AdminHeader = ({ role, name }: AdminHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
      <div>
        <h1 className="text-3xl font-bold mb-2 font-spartan">Espace Administration</h1>
        <p className="text-muted-foreground">
          {role === "super_admin" ? 
            "Panneau d'administration complet avec tous les accès" : 
            role === "business_admin" ? 
            "Administration des fonctionnalités Business" : 
            "Gestion modérée de la plateforme"}
        </p>
      </div>
      
      <div className="flex items-center mt-4 md:mt-0 space-x-2">
        <div className="bg-schoolier-teal/10 text-schoolier-teal px-3 py-1 rounded-full text-sm font-medium">
          {role === "super_admin" ? "Super Admin" : 
           role === "business_admin" ? "Business Admin" : "Admin"}
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
