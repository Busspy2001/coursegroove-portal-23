
import { AdminLayout } from "@/components/admin";
import { AdminSystemAlerts } from "@/components/admin/system/AdminSystemAlerts";

const AdminSystemAlertsPage = () => {
  return (
    <AdminLayout>
      <div className="container">
        <h1 className="text-3xl font-bold mb-4">Alertes système</h1>
        <AdminSystemAlerts />
      </div>
    </AdminLayout>
  );
};

export default AdminSystemAlertsPage;
