
import { AdminLayout } from "@/components/admin";
import { AdminSystemLogs } from "@/components/admin/system/AdminSystemLogs";

const AdminSystemLogsPage = () => {
  return (
    <AdminLayout>
      <div className="container">
        <h1 className="text-3xl font-bold mb-4">Logs système</h1>
        <AdminSystemLogs />
      </div>
    </AdminLayout>
  );
};

export default AdminSystemLogsPage;
