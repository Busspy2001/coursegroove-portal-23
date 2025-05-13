
import { AdminLayout } from "@/components/admin";
import { AdminUserActivity } from "@/components/admin";

const AdminUserActivityPage = () => {
  return (
    <AdminLayout>
      <div className="container">
        <h1 className="text-3xl font-bold mb-4">Activité utilisateur</h1>
        <AdminUserActivity />
      </div>
    </AdminLayout>
  );
};

export default AdminUserActivityPage;
