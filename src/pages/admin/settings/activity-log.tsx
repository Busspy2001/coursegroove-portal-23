
import { AdminLayout } from "@/components/admin";
import { AdminActivityLog } from "@/components/admin/settings/AdminActivityLog";

const AdminActivityLogPage = () => {
  return (
    <AdminLayout>
      <div className="container">
        <h1 className="text-3xl font-bold mb-4">Journal d'activité</h1>
        <AdminActivityLog />
      </div>
    </AdminLayout>
  );
};

export default AdminActivityLogPage;
