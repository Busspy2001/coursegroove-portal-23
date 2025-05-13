
import { AdminLayout } from "@/components/admin";
import { AdminCourseModeration } from "@/components/admin";

const AdminCoursesPage = () => {
  return (
    <AdminLayout>
      <div className="container">
        <h1 className="text-3xl font-bold mb-4">Cours à modérer</h1>
        <AdminCourseModeration />
      </div>
    </AdminLayout>
  );
};

export default AdminCoursesPage;
