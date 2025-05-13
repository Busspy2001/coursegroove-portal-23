
import { AdminLayout } from "@/components/admin";
import { AdminInternalMessages } from "@/components/admin/communication/AdminInternalMessages";

const AdminInternalMessagesPage = () => {
  return (
    <AdminLayout>
      <div className="container">
        <h1 className="text-3xl font-bold mb-4">Messages internes</h1>
        <AdminInternalMessages />
      </div>
    </AdminLayout>
  );
};

export default AdminInternalMessagesPage;
