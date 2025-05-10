import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/auth";
import { useCourseData } from "@/hooks/use-course-data";
import { useCourse } from "@/hooks/use-course";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft, BookOpen, FileText, MessageCircle } from "lucide-react";
import StudentCourseProgress from "@/components/StudentCourseProgress";
import CourseContentTab from "@/components/course-progress/CourseContentTab";
import CourseDiscussionTab from "@/components/course-progress/CourseDiscussionTab";

const CourseProgress = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { currentUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { course, sections, reviews, loading: courseDataLoading } = useCourseData(courseId);
  const { enrolled, progress, loading: enrollmentLoading } = useCourse(courseId || "");
  
  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null; // Return nothing during redirect
  }

  if (courseDataLoading || enrollmentLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container flex-grow flex items-center justify-center">
          <div className="flex flex-col items-center">
            <Loader2 className="h-10 w-10 text-schoolier-blue animate-spin mb-4" />
            <p className="text-muted-foreground">Chargement du cours...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Cours introuvable</h1>
            <p className="text-muted-foreground mb-6">
              Le cours que vous recherchez n'existe pas ou a été supprimé.
            </p>
            <Button onClick={() => navigate("/my-courses")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Revenir à mes cours
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-muted/30 border-b">
        <div className="container px-6 py-6">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate("/my-courses")}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour à mes cours
          </Button>
          
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-2/3">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">{course.title}</h1>
              <p className="text-muted-foreground mb-4">
                Par {course.instructor_name}
              </p>
              <div className="flex items-center text-sm space-x-4 text-muted-foreground">
                <span>{course.level}</span>
                <span>•</span>
                <span>{course.duration}</span>
                <span>•</span>
                <span>{sections.reduce((total, section) => total + (section.lessons?.length || 0), 0)} leçons</span>
              </div>
            </div>
            
            <div className="w-full md:w-1/3">
              <StudentCourseProgress
                courseId={course.id}
                courseName={course.title}
                totalLessons={sections.reduce((total, section) => total + (section.lessons?.length || 0), 0)}
                instructorName={course.instructor_name || ""}
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="container px-6 py-8 flex-grow">
        <Tabs defaultValue="content" className="w-full">
          <TabsList>
            <TabsTrigger value="content">
              <BookOpen className="h-4 w-4 mr-2" /> Contenu
            </TabsTrigger>
            <TabsTrigger value="notes">
              <FileText className="h-4 w-4 mr-2" /> Notes
            </TabsTrigger>
            <TabsTrigger value="discussion">
              <MessageCircle className="h-4 w-4 mr-2" /> Discussion
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="content">
            <CourseContentTab 
              sections={sections}
              progress={progress}
              enrolled={enrolled}
            />
          </TabsContent>
          
          <TabsContent value="notes">
            <div className="bg-muted/30 rounded-lg p-8 text-center">
              <h3 className="text-xl font-medium mb-2">Fonctionnalité à venir</h3>
              <p className="text-muted-foreground">
                La possibilité de prendre des notes sera bientôt disponible.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="discussion">
            <CourseDiscussionTab courseId={course.id} reviews={reviews} />
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default CourseProgress;
