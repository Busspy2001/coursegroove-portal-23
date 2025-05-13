
import { AdminLayout } from "@/components/admin";
import { AdminMarketingSeo } from "@/components/admin/marketing/AdminMarketingSeo";

const AdminMarketingSeoPage = () => {
  return (
    <AdminLayout>
      <div className="container">
        <h1 className="text-3xl font-bold mb-4">SEO & visibilité</h1>
        <AdminMarketingSeo />
      </div>
    </AdminLayout>
  );
};

export default AdminMarketingSeoPage;
