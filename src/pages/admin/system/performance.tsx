
import { AdminLayout } from "@/components/admin";
import { AdminSystemPerformance } from "@/components/admin/system/AdminSystemPerformance";

const AdminSystemPerformancePage = () => {
  return (
    <AdminLayout>
      <div className="container">
        <h1 className="text-3xl font-bold mb-4">Performance système</h1>
        <AdminSystemPerformance />
      </div>
    </AdminLayout>
  );
};

export default AdminSystemPerformancePage;
