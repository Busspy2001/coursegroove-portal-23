
import { AdminLayout } from "@/components/admin";
import { AdminPromotions } from "@/components/admin/marketing/AdminPromotions";

const AdminPromotionsPage = () => {
  return (
    <AdminLayout>
      <div className="container">
        <h1 className="text-3xl font-bold mb-4">Promotions</h1>
        <AdminPromotions />
      </div>
    </AdminLayout>
  );
};

export default AdminPromotionsPage;
