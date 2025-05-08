
import React from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import CourseCard from "@/components/CourseCard";
import { featuredCourses } from "@/data/courseData";

const FeaturedCoursesSection = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-16 container px-6 mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="heading-2 font-spartan">Nos cours les plus demandés 🔥</h2>
        <Button variant="outline" onClick={() => navigate("/courses")} className="border-schoolier-teal text-schoolier-teal hover:bg-schoolier-teal/10 font-spartan">
          Voir tous les cours
        </Button>
      </div>
      
      <p className="subheading mb-8">
        Rejoignez des milliers d'étudiants qui montrent en compétences aujourd'hui
      </p>
      
      <Tabs defaultValue="all" className="mb-8">
        <TabsList className="font-spartan">
          <TabsTrigger value="all">Tous</TabsTrigger>
          <TabsTrigger value="development">Développement</TabsTrigger>
          <TabsTrigger value="business">Business</TabsTrigger>
          <TabsTrigger value="design">Design</TabsTrigger>
          <TabsTrigger value="marketing">Marketing</TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
      
      <div className="mt-12 flex justify-center">
        <Button size="lg" onClick={() => navigate("/courses")} className="bg-schoolier-blue hover:bg-schoolier-blue/90 font-spartan">
          Découvrir tous les cours
        </Button>
      </div>
    </section>
  );
};

export default FeaturedCoursesSection;
