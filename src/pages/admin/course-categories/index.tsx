
import { AdminLayout } from "@/components/admin";
import AdminCourseCategories from "@/components/admin/courses/AdminCourseCategories";

const AdminCourseCategoriesPage = () => {
  return (
    <AdminLayout>
      <div className="container">
        <h1 className="text-3xl font-bold mb-4">Catégories & tags</h1>
        <AdminCourseCategories />
      </div>
    </AdminLayout>
  );
};

export default AdminCourseCategoriesPage;
