
import { AdminLayout } from "@/components/admin";
import { AdminBusinessPlans } from "@/components/admin/business/AdminBusinessPlans";

const AdminBusinessPlansPage = () => {
  return (
    <AdminLayout>
      <div className="container">
        <h1 className="text-3xl font-bold mb-4">Plans & abonnements entreprises</h1>
        <AdminBusinessPlans />
      </div>
    </AdminLayout>
  );
};

export default AdminBusinessPlansPage;
