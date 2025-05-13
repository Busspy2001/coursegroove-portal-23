
import { AdminLayout } from "@/components/admin";
import AdminQuickStats from "@/components/admin/dashboard/AdminQuickStats";

const AdminQuickStatsPage = () => {
  return (
    <AdminLayout>
      <div className="container">
        <h1 className="text-3xl font-bold mb-4">Statistiques rapides</h1>
        <AdminQuickStats />
      </div>
    </AdminLayout>
  );
};

export default AdminQuickStatsPage;
