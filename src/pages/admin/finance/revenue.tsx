
import { AdminLayout } from "@/components/admin";
import { AdminFinanceRevenue } from "@/components/admin/finance/AdminFinanceRevenue";

const AdminFinanceRevenuePage = () => {
  return (
    <AdminLayout>
      <div className="container">
        <h1 className="text-3xl font-bold mb-4">Revenus & Répartition</h1>
        <AdminFinanceRevenue />
      </div>
    </AdminLayout>
  );
};

export default AdminFinanceRevenuePage;
