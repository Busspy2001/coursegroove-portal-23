
import React from 'react';
import { Notification } from '@/types/message-types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import NotificationItem from './NotificationItem';

interface NotificationsListProps {
  notifications: Notification[];
}

const NotificationsList = ({ notifications }: NotificationsListProps) => {
  return (
    <>
      <div className="flex justify-between items-center p-3">
        <h3 className="text-sm font-medium">Notifications</h3>
        <Button variant="ghost" size="sm" className="h-8 px-2">
          <span className="text-xs">Tout marquer comme lu</span>
        </Button>
      </div>
      <ScrollArea className="h-[calc(100vh-14rem)] overflow-y-auto">
        {notifications.map((notification) => (
          <React.Fragment key={notification.id}>
            <NotificationItem notification={notification} />
            <Separator />
          </React.Fragment>
        ))}
      </ScrollArea>
    </>
  );
};

export default NotificationsList;
