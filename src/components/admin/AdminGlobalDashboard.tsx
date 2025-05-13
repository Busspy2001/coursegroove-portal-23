
import React from "react";
import { StatsGrid, RecentActivities, Activity } from "./dashboard";

const AdminGlobalDashboard = () => {
  // Mock data - in a real implementation, this would come from Supabase
  const stats = {
    totalUsers: 1245,
    newUsersToday: 32,
    totalCourses: 87,
    pendingCourses: 5,
    totalRevenue: "34,950€",
    revenueGrowth: "+12.5%",
    activeUsers: 678,
    averageRating: 4.7,
  };

  const recentActivities: Activity[] = [
    { id: 1, type: "user_registration", name: "Marie Dupont", time: "Il y a 23 minutes" },
    { id: 2, type: "course_published", name: "Python pour débutants", author: "Jean Michel", time: "Il y a 2 heures" },
    { id: 3, type: "course_review", name: "Design UI/UX", rating: 5, author: "Sophie Martin", time: "Il y a 3 heures" },
    { id: 4, type: "payment_received", name: "Paiement reçu", amount: "149€", course: "JavaScript Avancé", time: "Il y a 5 heures" },
  ];

  return (
    <div className="space-y-6">
      <h2 className="section-title">Tableau de bord global</h2>
      
      {/* Key metrics */}
      <StatsGrid stats={stats} />
      
      {/* Recent activities */}
      <RecentActivities activities={recentActivities} />
    </div>
  );
};

export default AdminGlobalDashboard;
