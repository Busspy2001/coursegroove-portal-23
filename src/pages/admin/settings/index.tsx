
import { AdminLayout } from "@/components/admin";
import AdminPlatformSettings from "@/components/admin/settings/AdminPlatformSettings";

const AdminSettingsPage = () => {
  return (
    <AdminLayout>
      <div className="container">
        <h1 className="text-3xl font-bold mb-4">Configuration de la plateforme</h1>
        <AdminPlatformSettings />
      </div>
    </AdminLayout>
  );
};

export default AdminSettingsPage;
