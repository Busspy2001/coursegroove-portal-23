
import { AdminLayout } from "@/components/admin";
import { AdminBusinessStatistics } from "@/components/admin/business/AdminBusinessStatistics";

const AdminBusinessStatisticsPage = () => {
  return (
    <AdminLayout>
      <div className="container">
        <h1 className="text-3xl font-bold mb-4">Statistiques B2B</h1>
        <AdminBusinessStatistics />
      </div>
    </AdminLayout>
  );
};

export default AdminBusinessStatisticsPage;
