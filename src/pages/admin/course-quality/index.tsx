
import { AdminLayout } from "@/components/admin";
import AdminCourseQuality from "@/components/admin/courses/AdminCourseQuality";

const AdminCourseQualityPage = () => {
  return (
    <AdminLayout>
      <div className="container">
        <h1 className="text-3xl font-bold mb-4">Qualité & anomalies des cours</h1>
        <AdminCourseQuality />
      </div>
    </AdminLayout>
  );
};

export default AdminCourseQualityPage;
