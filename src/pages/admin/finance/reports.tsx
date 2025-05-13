
import { AdminLayout } from "@/components/admin";
import { AdminFinanceReports } from "@/components/admin/finance/AdminFinanceReports";

const AdminFinanceReportsPage = () => {
  return (
    <AdminLayout>
      <div className="container">
        <h1 className="text-3xl font-bold mb-4">Rapports financiers</h1>
        <AdminFinanceReports />
      </div>
    </AdminLayout>
  );
};

export default AdminFinanceReportsPage;
