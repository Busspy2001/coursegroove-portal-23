
import React from 'react';
import { Notification } from '@/types/message-types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MessageSquare, Calendar, Info, Bell } from 'lucide-react';

interface NotificationItemProps {
  notification: Notification;
}

const NotificationItem = ({ notification }: NotificationItemProps) => {
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'course':
        return <MessageSquare className="h-4 w-4 text-schoolier-blue" />;
      case 'certification':
        return <Info className="h-4 w-4 text-schoolier-green" />;
      case 'event':
        return <Calendar className="h-4 w-4 text-schoolier-yellow" />;
      case 'system':
      default:
        return <Bell className="h-4 w-4 text-schoolier-gray" />;
    }
  };

  return (
    <div className={`p-4 flex items-start space-x-4 ${notification.read ? '' : 'bg-blue-50 dark:bg-blue-900/20'}`}>
      <div className="rounded-full p-2 bg-muted">
        {getNotificationIcon(notification.type)}
      </div>
      <div className="space-y-1 flex-1">
        <div className="flex justify-between">
          <p className="text-sm font-medium">{notification.title}</p>
          <time className="text-xs text-muted-foreground">
            {notification.timestamp.toLocaleDateString()}
          </time>
        </div>
        <p className="text-sm text-muted-foreground">{notification.message}</p>
        {notification.link && (
          <Button variant="link" className="p-0 h-auto text-sm text-schoolier-blue">
            Voir plus
          </Button>
        )}
      </div>
      {!notification.read && (
        <Badge variant="default" className="bg-schoolier-blue text-white h-2 w-2 rounded-full p-0" />
      )}
    </div>
  );
};

export default NotificationItem;
