
import { AdminLayout } from "@/components/admin";
import { AdminEmailCampaigns } from "@/components/admin/marketing/AdminEmailCampaigns";

const AdminEmailCampaignsPage = () => {
  return (
    <AdminLayout>
      <div className="container">
        <h1 className="text-3xl font-bold mb-4">Campagnes emails</h1>
        <AdminEmailCampaigns />
      </div>
    </AdminLayout>
  );
};

export default AdminEmailCampaignsPage;
