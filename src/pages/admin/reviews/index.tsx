
import { AdminLayout } from "@/components/admin";
import AdminCourseReviews from "@/components/admin/courses/AdminCourseReviews";

const AdminReviewsPage = () => {
  return (
    <AdminLayout>
      <div className="container">
        <h1 className="text-3xl font-bold mb-4">Avis et évaluations</h1>
        <AdminCourseReviews />
      </div>
    </AdminLayout>
  );
};

export default AdminReviewsPage;
