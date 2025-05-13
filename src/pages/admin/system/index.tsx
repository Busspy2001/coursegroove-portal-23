
import { AdminLayout } from "@/components/admin";
import { AdminSystemSecurity } from "@/components/admin/system/AdminSystemSecurity";

const AdminSystemSecurityPage = () => {
  return (
    <AdminLayout>
      <div className="container">
        <h1 className="text-3xl font-bold mb-4">Système & Sécurité</h1>
        <AdminSystemSecurity />
      </div>
    </AdminLayout>
  );
};

export default AdminSystemSecurityPage;
