
import { AdminLayout } from "@/components/admin";
import AdminNotificationTemplates from "@/components/admin/notifications/AdminNotificationTemplates";

const AdminNotificationTemplatesPage = () => {
  return (
    <AdminLayout>
      <div className="container">
        <h1 className="text-3xl font-bold mb-4">Modèles d'emails</h1>
        <AdminNotificationTemplates />
      </div>
    </AdminLayout>
  );
};

export default AdminNotificationTemplatesPage;
