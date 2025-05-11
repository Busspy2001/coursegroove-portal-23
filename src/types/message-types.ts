
export interface Message {
  id: string;
  sender: {
    id: string;
    name: string;
    avatar?: string;
    role: 'student' | 'instructor' | 'admin';
  };
  content: string;
  timestamp: Date;
  read: boolean;
}

export interface Conversation {
  id: string;
  participant: {
    id: string;
    name: string;
    avatar?: string;
    role: 'student' | 'instructor' | 'admin';
  };
  lastMessage: Message;
  unreadCount: number;
}

export interface Notification {
  id: string;
  type: 'course' | 'certification' | 'system' | 'event';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  link?: string;
}
