
import { Conversation, Message, Notification } from "@/types/message-types";

// Mock conversations data
export const getMockConversations = (): Conversation[] => {
  return [
    {
      id: 'conv-1',
      participant: {
        id: 'user-2',
        name: 'Julie Martin',
        avatar: undefined,
        role: 'instructor'
      },
      lastMessage: {
        id: 'msg-1',
        sender: {
          id: 'user-2',
          name: 'Julie Martin',
          avatar: undefined,
          role: 'instructor'
        },
        content: 'Bonjour ! Avez-vous des questions sur le devoir du module 3 ?',
        timestamp: new Date(2025, 4, 9, 14, 35),
        read: false
      },
      unreadCount: 1
    },
    {
      id: 'conv-2',
      participant: {
        id: 'user-3',
        name: 'Thomas Dubois',
        avatar: undefined,
        role: 'instructor'
      },
      lastMessage: {
        id: 'msg-2',
        sender: {
          id: 'user-3',
          name: 'Thomas Dubois',
          avatar: undefined,
          role: 'instructor'
        },
        content: 'Votre projet a été évalué. Vous pouvez consulter les résultats.',
        timestamp: new Date(2025, 4, 8, 11, 20),
        read: true
      },
      unreadCount: 0
    },
    {
      id: 'conv-3',
      participant: {
        id: 'user-4',
        name: 'Support Schoolier',
        avatar: undefined,
        role: 'admin'
      },
      lastMessage: {
        id: 'msg-3',
        sender: {
          id: 'user-4',
          name: 'Support Schoolier',
          avatar: undefined,
          role: 'admin'
        },
        content: 'Merci pour votre message. Un membre de notre équipe vous répondra dans les 24 heures.',
        timestamp: new Date(2025, 4, 7, 9, 15),
        read: true
      },
      unreadCount: 0
    }
  ];
};

// Mock notifications data
export const getMockNotifications = (): Notification[] => {
  return [
    {
      id: 'notif-1',
      type: 'course',
      title: 'Nouveau contenu disponible',
      message: 'Le module 4 du cours "React.js pour les développeurs" est maintenant disponible.',
      timestamp: new Date(2025, 4, 9, 8, 0),
      read: false,
      link: '/courses/course-3'
    },
    {
      id: 'notif-2',
      type: 'event',
      title: 'Rappel: Session live',
      message: 'Ne manquez pas la session live "Techniques avancées de CSS" demain à 18h.',
      timestamp: new Date(2025, 4, 8, 15, 30),
      read: false,
      link: '/events/event-1'
    },
    {
      id: 'notif-3',
      type: 'certification',
      title: 'Certification complétée',
      message: 'Félicitations! Vous avez terminé la certification "UX Design Fundamentals".',
      timestamp: new Date(2025, 4, 7, 12, 45),
      read: true,
      link: '/certifications/cert-2'
    },
    {
      id: 'notif-4',
      type: 'system',
      title: 'Mise à jour de la plateforme',
      message: 'La plateforme sera en maintenance le 15 mai de 2h à 4h du matin.',
      timestamp: new Date(2025, 4, 6, 10, 15),
      read: true
    }
  ];
};

// Mock messages for a specific conversation
export const getMockMessagesForConversation = (conversationId: string): Message[] => {
  // For demo purposes, always return the same messages regardless of the conversation ID
  return [
    {
      id: 'msg-1-1',
      sender: {
        id: 'user-2',
        name: 'Julie Martin',
        avatar: undefined,
        role: 'instructor'
      },
      content: 'Bonjour ! J\'espère que vous progressez bien dans le cours.',
      timestamp: new Date(2025, 4, 9, 14, 30),
      read: true
    },
    {
      id: 'msg-1-2',
      sender: {
        id: 'user-1',
        name: 'Moi',
        avatar: undefined,
        role: 'student'
      },
      content: 'Bonjour Julie ! Oui, j\'avance bien, merci !',
      timestamp: new Date(2025, 4, 9, 14, 32),
      read: true
    },
    {
      id: 'msg-1-3',
      sender: {
        id: 'user-2',
        name: 'Julie Martin',
        avatar: undefined,
        role: 'instructor'
      },
      content: 'Avez-vous des questions sur le devoir du module 3 ? La date limite est vendredi prochain.',
      timestamp: new Date(2025, 4, 9, 14, 35),
      read: false
    }
  ];
};
