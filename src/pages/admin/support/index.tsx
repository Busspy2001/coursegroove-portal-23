
import { AdminLayout } from "@/components/admin";
import AdminCustomerSupport from "@/components/admin/communication/AdminCustomerSupport";

const AdminCustomerSupportPage = () => {
  return (
    <AdminLayout>
      <div className="container">
        <h1 className="text-3xl font-bold mb-4">Support client</h1>
        <AdminCustomerSupport />
      </div>
    </AdminLayout>
  );
};

export default AdminCustomerSupportPage;
