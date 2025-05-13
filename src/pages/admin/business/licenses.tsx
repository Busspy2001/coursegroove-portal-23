
import { AdminLayout } from "@/components/admin";
import AdminBusinessLicenses from "@/components/admin/business/AdminBusinessLicenses";

const AdminBusinessLicensesPage = () => {
  return (
    <AdminLayout>
      <div className="container">
        <h1 className="text-3xl font-bold mb-4">Utilisation des licences</h1>
        <AdminBusinessLicenses />
      </div>
    </AdminLayout>
  );
};

export default AdminBusinessLicensesPage;
