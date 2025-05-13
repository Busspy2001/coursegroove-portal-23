
import { AdminLayout } from "@/components/admin";
import { AdminUserSupport } from "@/components/admin";

const AdminUserSupportPage = () => {
  return (
    <AdminLayout>
      <div className="container">
        <h1 className="text-3xl font-bold mb-4">Support & signalements</h1>
        <AdminUserSupport />
      </div>
    </AdminLayout>
  );
};

export default AdminUserSupportPage;
