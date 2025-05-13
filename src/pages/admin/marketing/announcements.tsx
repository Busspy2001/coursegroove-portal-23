
import { AdminLayout } from "@/components/admin";
import { AdminAnnouncements } from "@/components/admin/marketing/AdminAnnouncements";

const AdminAnnouncementsPage = () => {
  return (
    <AdminLayout>
      <div className="container">
        <h1 className="text-3xl font-bold mb-4">Annonces ciblées</h1>
        <AdminAnnouncements />
      </div>
    </AdminLayout>
  );
};

export default AdminAnnouncementsPage;
