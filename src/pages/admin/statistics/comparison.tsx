
import { AdminLayout } from "@/components/admin";
import { AdminStatisticsComparison } from "@/components/admin/statistics/AdminStatisticsComparison";

const AdminStatisticsComparisonPage = () => {
  return (
    <AdminLayout>
      <div className="container">
        <h1 className="text-3xl font-bold mb-4">Comparatif B2C vs B2B</h1>
        <AdminStatisticsComparison />
      </div>
    </AdminLayout>
  );
};

export default AdminStatisticsComparisonPage;
