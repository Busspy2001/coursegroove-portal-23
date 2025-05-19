
export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  type: 'course' | 'system' | 'certification' | 'event';
  link: string | null;
}

export interface Message {
  id: string;
  content: string;
  sender: {
    id: string;
    name: string;
    avatar: string;
    role?: string;
  };
  timestamp: Date;
  read: boolean;
  isCurrentUser?: boolean;
}

export interface Conversation {
  id: string;
  participant: {
    id: string;
    name: string;
    avatar: string | undefined;
    role?: string;
  };
  lastMessage: {
    id?: string;
    sender?: {
      id: string;
      name: string;
      avatar: string | undefined;
      role?: string;
    };
    content: string;
    timestamp: Date;
    read: boolean;
  };
  unreadCount: number;
}
