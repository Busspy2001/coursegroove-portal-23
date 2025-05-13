
import { AdminLayout } from "@/components/admin";
import { AdminNotificationsPreferences } from "@/components/admin/notifications/AdminNotificationsPreferences";

const AdminNotificationsPreferencesPage = () => {
  return (
    <AdminLayout>
      <div className="container">
        <h1 className="text-3xl font-bold mb-4">Préférences de notifications</h1>
        <AdminNotificationsPreferences />
      </div>
    </AdminLayout>
  );
};

export default AdminNotificationsPreferencesPage;
