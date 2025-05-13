
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command';
import { useAuth } from '@/contexts/auth';
import { UserRole } from '@/contexts/auth/types';

type CommandCategory = 'page' | 'user' | 'course' | 'business' | 'action';

interface CommandItem {
  id: string;
  name: string;
  category: CommandCategory;
  icon?: React.ReactNode;
  onSelect: () => void;
  keywords?: string[];
  requiredRole?: UserRole;
}

export function useCommandPalette() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const userRole = currentUser?.role || 'student';
  
  // Navigation pages based on role permissions
  const getNavigationCommands = useCallback((): CommandItem[] => {
    const pages = [
      {
        id: 'admin-dashboard',
        name: 'Tableau de bord',
        path: '/admin',
        roles: ['admin', 'super_admin', 'business_admin']
      },
      {
        id: 'users-management',
        name: 'Utilisateurs',
        path: '/admin/users',
        roles: ['admin', 'super_admin', 'business_admin']
      },
      {
        id: 'courses-moderation',
        name: 'Cours à modérer',
        path: '/admin/courses',
        roles: ['admin', 'super_admin']
      },
      {
        id: 'business-management',
        name: 'Entreprises',
        path: '/admin/business',
        roles: ['business_admin', 'super_admin']
      },
      {
        id: 'finance',
        name: 'Finance',
        path: '/admin/finance',
        roles: ['super_admin']
      },
      {
        id: 'statistics',
        name: 'Statistiques',
        path: '/admin/statistics',
        roles: ['admin', 'super_admin', 'business_admin']
      }
    ];
    
    return pages
      .filter(page => page.roles.includes(userRole))
      .map(page => ({
        id: page.id,
        name: page.name,
        category: 'page' as CommandCategory,
        onSelect: () => {
          navigate(page.path);
          setOpen(false);
        },
        keywords: [page.name.toLowerCase()]
      }));
  }, [userRole, navigate]);
  
  // Common admin actions
  const getActionCommands = useCallback((): CommandItem[] => {
    const actions = [
      {
        id: 'approve-course',
        name: 'Approuver un cours',
        roles: ['admin', 'super_admin'],
        onSelect: () => {
          navigate('/admin/courses?filter=pending');
          setOpen(false);
        }
      },
      {
        id: 'view-reports',
        name: 'Voir les signalements',
        roles: ['admin', 'super_admin', 'business_admin'],
        onSelect: () => {
          navigate('/admin/user-support');
          setOpen(false);
        }
      },
      {
        id: 'logout',
        name: 'Se déconnecter',
        roles: ['student', 'instructor', 'admin', 'super_admin', 'business_admin'],
        onSelect: () => {
          // Cette fonction sera simplement un raccourci et ne déconnecte pas réellement
          navigate('/login?logout=true');
          setOpen(false);
        }
      }
    ];
    
    return actions
      .filter(action => action.roles.includes(userRole))
      .map(action => ({
        id: action.id,
        name: action.name,
        category: 'action' as CommandCategory,
        onSelect: action.onSelect,
        keywords: [action.name.toLowerCase()]
      }));
  }, [userRole, navigate]);
  
  // All available commands
  const commands = [...getNavigationCommands(), ...getActionCommands()];
  
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || e.key === '/') {
        e.preventDefault();
        setOpen(open => !open);
      }
    };
    
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);
  
  const CommandPaletteDialog = (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Rechercher..." />
      <CommandList>
        <CommandEmpty>Aucun résultat trouvé</CommandEmpty>
        
        <CommandGroup heading="Navigation">
          {commands
            .filter(command => command.category === 'page')
            .map(command => (
              <CommandItem key={command.id} onSelect={command.onSelect}>
                {command.icon}
                <span>{command.name}</span>
              </CommandItem>
            ))}
        </CommandGroup>
        
        <CommandGroup heading="Actions">
          {commands
            .filter(command => command.category === 'action')
            .map(command => (
              <CommandItem key={command.id} onSelect={command.onSelect}>
                {command.icon}
                <span>{command.name}</span>
              </CommandItem>
            ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
  
  return {
    setOpen,
    CommandPaletteDialog
  };
}
