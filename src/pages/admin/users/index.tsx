
import { AdminLayout } from "@/components/admin";
import { AdminUserManagement } from "@/components/admin";

const AdminUsersPage = () => {
  return (
    <AdminLayout>
      <div className="container">
        <h1 className="text-3xl font-bold mb-4">Gestion des comptes utilisateurs</h1>
        <AdminUserManagement />
      </div>
    </AdminLayout>
  );
};

export default AdminUsersPage;
