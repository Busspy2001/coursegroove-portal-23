
import { AdminLayout } from "@/components/admin";
import AdminMobileSettings from "@/components/admin/settings/AdminMobileSettings";

const AdminMobileSettingsPage = () => {
  return (
    <AdminLayout>
      <div className="container">
        <h1 className="text-3xl font-bold mb-4">Adaptabilité mobile</h1>
        <AdminMobileSettings />
      </div>
    </AdminLayout>
  );
};

export default AdminMobileSettingsPage;
