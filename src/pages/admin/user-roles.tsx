
import { AdminLayout } from "@/components/admin";
import AdminUserRoles from "@/components/admin/users/AdminUserRoles";

const AdminUserRolesPage = () => {
  return (
    <AdminLayout>
      <div className="container">
        <h1 className="text-3xl font-bold mb-4">Gestion des rôles utilisateurs</h1>
        <AdminUserRoles />
      </div>
    </AdminLayout>
  );
};

export default AdminUserRolesPage;
