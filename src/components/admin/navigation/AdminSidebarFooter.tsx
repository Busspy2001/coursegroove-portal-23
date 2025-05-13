
import React from 'react';
import { SidebarFooter } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { ExternalLink, HelpCircle, Info, LifeBuoy, LogOut, Settings } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface AdminSidebarFooterProps {
  onLogout: () => void;
  isLoggingOut: boolean;
}

const AdminSidebarFooter: React.FC<AdminSidebarFooterProps> = ({ onLogout, isLoggingOut }) => {
  return (
    <SidebarFooter className="p-4 border-t space-y-4">
      <div className="grid grid-cols-3 gap-2">
        <Button 
          variant="outline" 
          size="icon" 
          className="h-8 w-8" 
          title="Paramètres"
        >
          <Settings className="h-4 w-4" />
        </Button>
        
        <Button 
          variant="outline" 
          size="icon" 
          className="h-8 w-8" 
          title="Aide"
        >
          <HelpCircle className="h-4 w-4" />
        </Button>
        
        <Button 
          variant="outline" 
          size="icon" 
          className="h-8 w-8" 
          title="Support"
        >
          <LifeBuoy className="h-4 w-4" />
        </Button>
      </div>
      
      <Separator />
      
      <div className="space-y-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full justify-start text-xs"
          onClick={() => window.open("https://docs.schoolier.com/admin", "_blank")}
        >
          <Info className="h-3.5 w-3.5 mr-2" />
          Documentation
        </Button>
        
        <Button 
          variant="destructive"
          size="sm" 
          className="w-full justify-start text-xs" 
          onClick={onLogout}
          disabled={isLoggingOut}
        >
          <LogOut className="h-3.5 w-3.5 mr-2" />
          {isLoggingOut ? "Déconnexion..." : "Se déconnecter"}
        </Button>
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-xs text-muted-foreground">
          Schoolier Admin v1.2.5
        </p>
      </div>
    </SidebarFooter>
  );
};

export default AdminSidebarFooter;
