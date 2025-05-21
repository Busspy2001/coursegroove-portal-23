
import { Navigate } from 'react-router-dom';

import EmployeeLayout from '../components/employee-dashboard/EmployeeLayout';
import EmployeeDashboard from '../pages/employee/EmployeeDashboard';
import EmployeeCourses from '../pages/employee/EmployeeCourses';
import EmployeeCatalog from '../pages/employee/EmployeeCatalog';
import EmployeeCertifications from '../pages/employee/EmployeeCertifications';
import EmployeeProfile from '../pages/employee/EmployeeProfile';
import EmployeeAssessments from '../components/employee-dashboard/assessments/EmployeeAssessments';

const employeeRoutes = {
  path: '/employee',
  element: <EmployeeLayout />,
  children: [
    {
      index: true,
      element: <EmployeeDashboard />
    },
    {
      path: 'formations',
      element: <EmployeeCourses />
    },
    {
      path: 'catalogue',
      element: <EmployeeCatalog />
    },
    {
      path: 'evaluations',
      element: <EmployeeAssessments />
    },
    {
      path: 'certifications',
      element: <EmployeeCertifications />
    },
    {
      path: 'profil',
      element: <EmployeeProfile />
    },
    {
      path: '*',
      element: <Navigate to="/employee" replace />
    }
  ]
};

export default employeeRoutes;
