
import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatCards from "@/components/dashboard/StatCards";
import DashboardTabs from "@/components/dashboard/DashboardTabs";
import { allCourses } from "@/data/courseData";
import { EnrolledCourse } from "@/components/dashboard/CourseCard";

const Dashboard = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  // Mock enrolled courses
  const enrolledCourses: EnrolledCourse[] = allCourses.slice(0, 3).map(course => ({
    ...course,
    progress: Math.floor(Math.random() * 100),
    lastAccessed: new Date(Date.now() - Math.floor(Math.random() * 10) * 24 * 60 * 60 * 1000)
  }));

  if (!isAuthenticated) {
    return null; // Return nothing during redirect
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container px-6 py-8 flex-grow">
        <DashboardHeader userName={currentUser?.name} />
        <StatCards enrolledCoursesCount={enrolledCourses.length} />
        <DashboardTabs enrolledCourses={enrolledCourses} />
      </div>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
