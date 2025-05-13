
import { AdminLayout } from "@/components/admin";
import { AdminBusinessManagement } from "@/components/admin";

const AdminBusinessPage = () => {
  return (
    <AdminLayout>
      <div className="container">
        <h1 className="text-3xl font-bold mb-4">Liste des entreprises</h1>
        <AdminBusinessManagement />
      </div>
    </AdminLayout>
  );
};

export default AdminBusinessPage;
