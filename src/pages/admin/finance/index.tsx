
import { AdminLayout } from "@/components/admin";
import { AdminFinance } from "@/components/admin";

const AdminFinancePage = () => {
  return (
    <AdminLayout>
      <div className="container">
        <h1 className="text-3xl font-bold mb-4">Transactions</h1>
        <AdminFinance />
      </div>
    </AdminLayout>
  );
};

export default AdminFinancePage;
