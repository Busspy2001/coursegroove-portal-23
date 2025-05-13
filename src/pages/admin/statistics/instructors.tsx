
import { AdminLayout } from "@/components/admin";
import { AdminInstructorStatistics } from "@/components/admin/statistics/AdminInstructorStatistics";

const AdminInstructorStatsPage = () => {
  return (
    <AdminLayout>
      <div className="container">
        <h1 className="text-3xl font-bold mb-4">Statistiques instructeurs</h1>
        <AdminInstructorStatistics />
      </div>
    </AdminLayout>
  );
};

export default AdminInstructorStatsPage;
