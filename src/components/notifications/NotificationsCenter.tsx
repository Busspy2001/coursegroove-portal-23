
import React, { useState, useEffect } from 'react';
import { Bell, CheckCircle, XCircle, AlertTriangle, Info } from 'lucide-react';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Notification } from '@/types/database';
import NotificationsList from '@/components/messages/NotificationsList';

export const NotificationsCenter = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchNotifications();
    setupRealtimeSubscription();
  }, []);

  const fetchNotifications = async () => {
    try {
      setIsLoading(true);
      const { data: session } = await supabase.auth.getSession();
      if (!session?.session?.user?.id) return;

      const userId = session.session.user.id;
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;

      // Transform the data to match the notification interface
      const formattedNotifications = data.map(notification => ({
        id: notification.id,
        title: notification.type.charAt(0).toUpperCase() + notification.type.slice(1),
        message: notification.message,
        timestamp: new Date(notification.created_at),
        read: notification.is_read,
        type: notification.type,
        link: notification.link,
      }));

      setNotifications(formattedNotifications);
      setUnreadCount(formattedNotifications.filter(n => !n.read).length);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de charger les notifications',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const setupRealtimeSubscription = () => {
    const channel = supabase
      .channel('notifications-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
        },
        (payload) => {
          const newNotification = payload.new as any;
          
          // Check if the notification is for the current user
          const { data: session } = supabase.auth.getSession();
          if (session && newNotification.user_id === session.session?.user?.id) {
            // Add the new notification to the list
            setNotifications(prev => [{
              id: newNotification.id,
              title: newNotification.type.charAt(0).toUpperCase() + newNotification.type.slice(1),
              message: newNotification.message,
              timestamp: new Date(newNotification.created_at),
              read: newNotification.is_read,
              type: newNotification.type,
              link: newNotification.link,
            }, ...prev]);
            
            // Update unread count
            setUnreadCount(prev => prev + 1);
            
            // Show toast for new notification
            toast({
              title: newNotification.type.charAt(0).toUpperCase() + newNotification.type.slice(1),
              description: newNotification.message,
              variant: 'info',
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const markAllAsRead = async () => {
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session?.session?.user?.id) return;

      const userId = session.session.user.id;
      const { error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('user_id', userId)
        .eq('is_read', false);

      if (error) throw error;

      // Update local state
      setNotifications(prev => 
        prev.map(notification => ({ ...notification, read: true }))
      );
      setUnreadCount(0);

      toast({
        title: 'Succès',
        description: 'Toutes les notifications ont été marquées comme lues',
        variant: 'success',
      });
    } catch (error) {
      console.error('Error marking notifications as read:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de marquer les notifications comme lues',
        variant: 'destructive',
      });
    }
  };

  const markAsRead = async (notificationId: string) => {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('id', notificationId);

      if (error) throw error;

      // Update local state
      setNotifications(prev => 
        prev.map(notification => 
          notification.id === notificationId 
            ? { ...notification, read: true } 
            : notification
        )
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Error marking notification as read:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de marquer la notification comme lue',
        variant: 'destructive',
      });
    }
  };

  const mockNotifications = [
    {
      id: '1',
      title: 'Formation',
      message: 'Une nouvelle formation "Excel avancé" est disponible',
      timestamp: new Date(),
      read: false,
      type: 'course',
      link: '#'
    },
    {
      id: '2',
      title: 'Système',
      message: 'Maintenance prévue ce weekend',
      timestamp: new Date(Date.now() - 86400000),
      read: true,
      type: 'system',
      link: null
    },
    {
      id: '3',
      title: 'Certification',
      message: 'Félicitations! Vous avez obtenu le certificat "Management"',
      timestamp: new Date(Date.now() - 172800000),
      read: false,
      type: 'certification',
      link: '#'
    },
  ];

  // Use mock data if no real notifications are available yet
  const displayNotifications = notifications.length > 0 ? notifications : mockNotifications;
  const displayUnreadCount = notifications.length > 0 ? unreadCount : 2;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {displayUnreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {displayUnreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <NotificationsList notifications={displayNotifications} />
        <div className="p-2 border-t">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full text-xs"
            onClick={markAllAsRead}
          >
            Tout marquer comme lu
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationsCenter;
