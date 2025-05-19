
import { BusinessStats } from './useOverviewData';

export const useDemoCompanyData = (): BusinessStats => {
  // Generate relative dates based on current date
  const now = new Date();
  const hoursAgo = (hours: number) => new Date(now.getTime() - hours * 60 * 60 * 1000).toISOString();
  const daysAhead = (days: number) => new Date(now.getTime() + days * 24 * 60 * 60 * 1000).toISOString();

  return {
    total_employees: 124,
    active_courses: 32,
    departments_count: 8,
    completion_rate: 78,
    recent_activities: [
      {
        id: "1",
        type: "course_completion",
        message: "Sophie Martin a terminé \"Introduction à la cybersécurité\"",
        date: hoursAgo(2)
      },
      {
        id: "2",
        type: "user_registration",
        message: "Thomas Dubois a rejoint l'équipe IT",
        date: hoursAgo(5)
      },
      {
        id: "3",
        type: "course_enrollment",
        message: "Julie Leclerc s'est inscrite à \"Leadership et management d'équipe\"",
        date: hoursAgo(8)
      },
      {
        id: "4",
        type: "course_completion",
        message: "Antoine Bernard a obtenu la certification \"Excel avancé\"",
        date: hoursAgo(24)
      }
    ],
    upcoming_trainings: [
      {
        id: "1",
        title: "Cybersécurité - Niveau intermédiaire",
        date: daysAhead(2),
        assignees: 15
      },
      {
        id: "2",
        title: "Leadership et gestion de conflits",
        date: daysAhead(5),
        assignees: 8
      },
      {
        id: "3",
        title: "Analyse de données avec Power BI",
        date: daysAhead(7),
        assignees: 12
      }
    ],
    top_performers: [
      {
        id: "1",
        name: "Sophie Martin",
        department: "Marketing",
        completion: 95,
        courses_completed: 12
      },
      {
        id: "2",
        name: "Thomas Dubois",
        department: "IT",
        completion: 92,
        courses_completed: 15
      },
      {
        id: "3",
        name: "Julie Leclerc",
        department: "Finance",
        completion: 88,
        courses_completed: 10
      },
      {
        id: "4",
        name: "Antoine Bernard",
        department: "RH",
        completion: 85,
        courses_completed: 9
      }
    ]
  };
};
