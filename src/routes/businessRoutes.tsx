
import { Navigate } from 'react-router-dom';
import BusinessLayout from '../components/entreprise-dashboard/BusinessLayout';

import BusinessOverview from '../pages/entreprise/BusinessDashboard';
import BusinessEmployees from '../components/entreprise-dashboard/employees/BusinessEmployees';
import BusinessDepartments from '../components/entreprise-dashboard/departments/BusinessDepartments';
import BusinessTrainings from '../components/entreprise-dashboard/trainings/BusinessTrainings';
import BusinessStatistics from '../components/entreprise-dashboard/statistics/BusinessStatistics';
import BusinessSettings from '../components/entreprise-dashboard/settings/BusinessSettings';
import BusinessAssessments from '../components/entreprise-dashboard/assessments/BusinessAssessments'; 
import BusinessSkills from '../components/entreprise-dashboard/skills/BusinessSkills';

const businessRoutes = {
  path: '/entreprise',
  element: <BusinessLayout />,
  children: [
    {
      index: true,
      element: <BusinessOverview />
    },
    {
      path: 'collaborateurs',
      element: <BusinessEmployees />
    },
    {
      path: 'departements',
      element: <BusinessDepartments />
    },
    {
      path: 'formations',
      element: <BusinessTrainings />
    },
    {
      path: 'formations/ajouter',
      element: <BusinessTrainings />
    },
    {
      path: 'formations/assigner',
      element: <BusinessTrainings />
    },
    {
      path: 'evaluations',
      element: <BusinessAssessments />
    },
    {
      path: 'competences',
      element: <BusinessSkills />
    },
    {
      path: 'statistiques',
      element: <BusinessStatistics />
    },
    {
      path: 'facturation',
      element: <div>Facturation</div>
    },
    {
      path: 'parametres',
      element: <BusinessSettings />
    },
    {
      path: '*',
      element: <Navigate to="/entreprise" replace />
    }
  ]
};

export default businessRoutes;
