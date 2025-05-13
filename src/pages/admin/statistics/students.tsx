
import { AdminLayout } from "@/components/admin";
import { AdminStudentStatistics } from "@/components/admin/statistics/AdminStudentStatistics";

const AdminStudentStatsPage = () => {
  return (
    <AdminLayout>
      <div className="container">
        <h1 className="text-3xl font-bold mb-4">Statistiques étudiants</h1>
        <AdminStudentStatistics />
      </div>
    </AdminLayout>
  );
};

export default AdminStudentStatsPage;
