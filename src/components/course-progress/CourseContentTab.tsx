
import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CourseSection, CourseLesson } from "@/hooks/use-course-data";
import { PlayCircle, FileText, CheckCircle, LockKeyhole } from "lucide-react";

interface CourseContentTabProps {
  sections: CourseSection[];
  progress: number;
  enrolled: boolean;
}

const CourseContentTab = ({ sections, progress, enrolled }: CourseContentTabProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Contenu du cours</h2>
      
      {!enrolled && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
          <p className="text-amber-800">
            Inscrivez-vous à ce cours pour accéder à tout le contenu.
          </p>
        </div>
      )}
      
      <div>
        <Accordion type="single" collapsible className="w-full">
          {sections.map((section, index) => (
            <AccordionItem key={section.id} value={section.id}>
              <AccordionTrigger className="hover:bg-muted/30 px-4 rounded-md">
                <div className="flex items-center">
                  <span className="font-medium">
                    Section {index + 1}: {section.title}
                  </span>
                  <Badge variant="outline" className="ml-4">
                    {section.lessons?.length || 0} leçons
                  </Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pl-4">
                <ul className="space-y-2">
                  {section.lessons?.map((lesson, lessonIndex) => (
                    <li key={lesson.id}>
                      <div className="flex items-center justify-between py-3 px-4 rounded-md hover:bg-muted/30">
                        <div className="flex items-center">
                          {getLessonIcon(lesson.type)}
                          <div className="ml-3">
                            <p className="font-medium">{lesson.title}</p>
                            <p className="text-sm text-muted-foreground">
                              {lesson.duration}
                            </p>
                          </div>
                        </div>
                        
                        <Button 
                          variant="ghost" 
                          size="sm"
                          disabled={!lesson.is_preview && !enrolled}
                        >
                          {!lesson.is_preview && !enrolled ? (
                            <LockKeyhole className="h-4 w-4" />
                          ) : (
                            <PlayCircle className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

const getLessonIcon = (type: string) => {
  switch (type) {
    case 'video':
      return <PlayCircle className="h-5 w-5 text-schoolier-blue" />;
    case 'document':
      return <FileText className="h-5 w-5 text-schoolier-teal" />;
    case 'quiz':
      return <CheckCircle className="h-5 w-5 text-schoolier-green" />;
    default:
      return <FileText className="h-5 w-5 text-schoolier-teal" />;
  }
};

export default CourseContentTab;
