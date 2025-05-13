
import { AdminLayout } from "@/components/admin";
import AdminFaq from "@/components/admin/communication/AdminFaq";

const AdminFaqPage = () => {
  return (
    <AdminLayout>
      <div className="container">
        <h1 className="text-3xl font-bold mb-4">FAQ & Aide</h1>
        <AdminFaq />
      </div>
    </AdminLayout>
  );
};

export default AdminFaqPage;
