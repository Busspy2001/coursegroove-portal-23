
import { v4 as uuidv4 } from 'uuid';
import { UserRole } from '@/contexts/auth/types';
import { DemoAccount } from './types';

/**
 * Provides pre-configured demo accounts for different user roles
 */
export const getDemoAccounts = (): DemoAccount[] => {
  return [
    {
      id: uuidv4(),
      email: 'etudiant@schoolier.com',
      password: 'demo123',
      role: 'student',
      name: 'Jean Dupont',
      avatar: 'https://api.dicebear.com/6.x/initials/svg?seed=JD&backgroundColor=0D9488',
      description: 'Accédez à différents cours et suivez votre progression.',
      features: [
        'Parcourir le catalogue de cours',
        'Suivre des cours et compléter des leçons',
        'Recevoir des certificats',
        'Interagir avec la communauté'
      ]
    },
    {
      id: uuidv4(),
      email: 'prof@schoolier.com',
      password: 'demo123',
      role: 'instructor',
      name: 'Marie Laurent',
      avatar: 'https://api.dicebear.com/6.x/initials/svg?seed=ML&backgroundColor=4338CA',
      description: 'Créez et gérez des cours, interagissez avec vos étudiants.',
      features: [
        'Créer et publier des cours',
        'Analyser les statistiques des cours',
        'Interagir avec les étudiants',
        'Gérer les revenus et paiements'
      ]
    },
    {
      id: uuidv4(),
      email: 'admin@schoolier.com',
      password: 'demo123',
      role: 'admin',
      name: 'Admin Demo',
      avatar: 'https://api.dicebear.com/6.x/initials/svg?seed=AD&backgroundColor=BE185D',
      description: 'Supervisez tous les aspects de la plateforme.',
      features: [
        'Gérer les utilisateurs et les cours',
        'Modérer les contenus',
        'Accéder aux statistiques globales',
        'Configurer les paramètres système'
      ]
    },
    {
      id: uuidv4(),
      email: 'business@schoolier.com',
      password: 'demo123',
      role: 'business_admin',
      name: 'Sophie Martin',
      avatar: 'https://api.dicebear.com/6.x/initials/svg?seed=SM&backgroundColor=D97706',
      description: 'Gérez la formation pour votre entreprise.',
      features: [
        'Gérer les utilisateurs de l\'entreprise',
        'Suivre les progrès de l\'équipe',
        'Attribuer des cours et parcours',
        'Analyser les résultats de formation'
      ]
    }
  ];
};
