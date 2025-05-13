
import { AdminLayout } from "@/components/admin";
import AdminApiSettings from "@/components/admin/settings/AdminApiSettings";

const AdminApiSettingsPage = () => {
  return (
    <AdminLayout>
      <div className="container">
        <h1 className="text-3xl font-bold mb-4">API & webhooks</h1>
        <AdminApiSettings />
      </div>
    </AdminLayout>
  );
};

export default AdminApiSettingsPage;
