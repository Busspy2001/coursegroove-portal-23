
import { AdminLayout } from "@/components/admin";
import AdminRolesManagement from "@/components/admin/settings/AdminRolesManagement";

const AdminRolesPage = () => {
  return (
    <AdminLayout>
      <div className="container">
        <h1 className="text-3xl font-bold mb-4">Gestion des rôles</h1>
        <AdminRolesManagement />
      </div>
    </AdminLayout>
  );
};

export default AdminRolesPage;
