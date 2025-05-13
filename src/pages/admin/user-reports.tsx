
import { AdminLayout } from "@/components/admin";
import { AdminReports } from "@/components/admin/users/AdminReports";

const AdminUserReportsPage = () => {
  return (
    <AdminLayout>
      <div className="container">
        <h1 className="text-3xl font-bold mb-4">Signalements utilisateurs</h1>
        <AdminReports />
      </div>
    </AdminLayout>
  );
};

export default AdminUserReportsPage;
