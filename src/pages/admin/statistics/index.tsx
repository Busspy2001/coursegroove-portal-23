
import { AdminLayout } from "@/components/admin";
import { AdminStatistics } from "@/components/admin";

const AdminStatisticsPage = () => {
  return (
    <AdminLayout>
      <div className="container">
        <h1 className="text-3xl font-bold mb-4">Vue globale des statistiques</h1>
        <AdminStatistics />
      </div>
    </AdminLayout>
  );
};

export default AdminStatisticsPage;
