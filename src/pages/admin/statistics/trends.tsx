
import { AdminLayout } from "@/components/admin";
import AdminStatisticsTrends from "@/components/admin/statistics/AdminStatisticsTrends";

const AdminStatisticsTrendsPage = () => {
  return (
    <AdminLayout>
      <div className="container">
        <h1 className="text-3xl font-bold mb-4">Tendances & prévisions</h1>
        <AdminStatisticsTrends />
      </div>
    </AdminLayout>
  );
};

export default AdminStatisticsTrendsPage;
