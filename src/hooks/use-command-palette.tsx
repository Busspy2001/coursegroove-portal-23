
import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from '@/components/ui/command';
import {
  Users,
  BookOpen,
  Building,
  CreditCard,
  Settings,
  BarChart3,
  Search,
  Shield,
  User,
  Tag,
  Mail,
  MessageSquare,
  Bell,
} from 'lucide-react';

export type CommandPaletteAction = {
  title: string;
  icon?: React.ReactNode;
  action: () => void;
  keywords?: string[];
};

export const useCommandPalette = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // Ouvrir avec Cmd+K / Ctrl+K
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(open => !open);
      }
    };
    
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  // Actions de navigation
  const navigateTo = useCallback((path: string) => {
    navigate(path);
    setOpen(false);
  }, [navigate]);

  // Liste des actions disponibles
  const actions: CommandPaletteAction[] = [
    // Navigation vers modules principaux
    { title: "Tableau de bord", icon: <BarChart3 className="mr-2 h-4 w-4" />, action: () => navigateTo("/admin") },
    { title: "Utilisateurs", icon: <Users className="mr-2 h-4 w-4" />, action: () => navigateTo("/admin/users") },
    { title: "Cours", icon: <BookOpen className="mr-2 h-4 w-4" />, action: () => navigateTo("/admin/courses") },
    { title: "Entreprises", icon: <Building className="mr-2 h-4 w-4" />, action: () => navigateTo("/admin/business") },
    { title: "Finance", icon: <CreditCard className="mr-2 h-4 w-4" />, action: () => navigateTo("/admin/finance") },
    { title: "Statistiques", icon: <BarChart3 className="mr-2 h-4 w-4" />, action: () => navigateTo("/admin/statistics") },
    { title: "Marketing", icon: <Tag className="mr-2 h-4 w-4" />, action: () => navigateTo("/admin/marketing") },
    { title: "Communication", icon: <MessageSquare className="mr-2 h-4 w-4" />, action: () => navigateTo("/admin/messages") },
    { title: "Notifications", icon: <Bell className="mr-2 h-4 w-4" />, action: () => navigateTo("/admin/notifications") },
    { title: "Paramètres", icon: <Settings className="mr-2 h-4 w-4" />, action: () => navigateTo("/admin/settings") },
    { title: "Système", icon: <Shield className="mr-2 h-4 w-4" />, action: () => navigateTo("/admin/system") },
    
    // Actions rapides
    { title: "Chercher un utilisateur", icon: <User className="mr-2 h-4 w-4" />, action: () => navigateTo("/admin/users?action=search") },
    { title: "Modérer un cours", icon: <BookOpen className="mr-2 h-4 w-4" />, action: () => navigateTo("/admin/courses?action=moderate") },
    { title: "Vérifier les signalements", icon: <Shield className="mr-2 h-4 w-4" />, action: () => navigateTo("/admin/user-support") },
    { title: "Envoyer un email de masse", icon: <Mail className="mr-2 h-4 w-4" />, action: () => navigateTo("/admin/marketing/emails") },
  ];

  const CommandPaletteDialog = (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Que voulez-vous faire ?" />
      <CommandList>
        <CommandEmpty>Aucun résultat trouvé.</CommandEmpty>
        <CommandGroup heading="Navigation">
          {actions.slice(0, 11).map((action) => (
            <CommandItem key={action.title} onSelect={action.action}>
              {action.icon}
              <span>{action.title}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Actions rapides">
          {actions.slice(11).map((action) => (
            <CommandItem key={action.title} onSelect={action.action}>
              {action.icon}
              <span>{action.title}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );

  return { open, setOpen, CommandPaletteDialog };
};
