
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import InstructorSidebar from "@/components/instructor/InstructorSidebar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { FilePlus, Loader2 } from "lucide-react";
import InstructorCoursesList from "@/components/instructor/InstructorCoursesList";
import { useInstructorData } from "@/hooks/use-instructor-data";

const InstructorCourses = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { loading, courses } = useInstructorData();

  // Redirect if not authenticated or not an instructor
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else if (currentUser?.role !== "instructor") {
      navigate("/dashboard");
    }
  }, [isAuthenticated, currentUser, navigate]);

  if (!isAuthenticated || currentUser?.role !== "instructor") {
    return null; // Return nothing during redirect
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container flex-grow flex items-center justify-center">
          <div className="flex flex-col items-center">
            <Loader2 className="h-10 w-10 text-schoolier-blue animate-spin mb-4" />
            <p className="text-muted-foreground">Chargement...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full">
        <InstructorSidebar />
        
        <SidebarInset>
          <Navbar />
          
          <div className="container px-6 py-8 flex-grow">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold">Mes cours</h1>
                <p className="text-muted-foreground">
                  Gérez tous vos cours en un seul endroit
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <Button onClick={() => navigate("/instructor/courses/create")} className="flex items-center">
                  <FilePlus className="mr-2 h-5 w-5" />
                  Créer un nouveau cours
                </Button>
              </div>
            </div>
            
            <InstructorCoursesList courses={courses} />
          </div>
          
          <Footer />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default InstructorCourses;
