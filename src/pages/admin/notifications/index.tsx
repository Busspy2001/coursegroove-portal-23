
import { AdminLayout } from "@/components/admin";
import { AdminNotificationsManager } from "@/components/admin/notifications/AdminNotificationsManager";

const AdminNotificationsPage = () => {
  return (
    <AdminLayout>
      <div className="container">
        <h1 className="text-3xl font-bold mb-4">Gestion & historique des notifications</h1>
        <AdminNotificationsManager />
      </div>
    </AdminLayout>
  );
};

export default AdminNotificationsPage;
