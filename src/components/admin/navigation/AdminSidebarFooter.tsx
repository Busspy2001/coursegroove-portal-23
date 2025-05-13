
import React from 'react';
import { SidebarFooter } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Shield, Loader2 } from 'lucide-react';

interface AdminSidebarFooterProps {
  onLogout: () => void;
  isLoggingOut: boolean;
}

const AdminSidebarFooter: React.FC<AdminSidebarFooterProps> = ({ 
  onLogout, 
  isLoggingOut 
}) => {
  return (
    <SidebarFooter className="p-4">
      <Button 
        variant="ghost" 
        className="w-full justify-start text-schoolier-red hover:text-red-600 hover:bg-red-50"
        onClick={onLogout}
        disabled={isLoggingOut}
      >
        {isLoggingOut ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Shield className="mr-2 h-4 w-4" />
        )}
        {isLoggingOut ? "Déconnexion en cours..." : "Se déconnecter"}
      </Button>
    </SidebarFooter>
  );
};

export default AdminSidebarFooter;
