
import React from "react";
import CourseCard, { EnrolledCourse } from "./CourseCard";
import EmptyCourseState from "./EmptyCourseState";

interface MyCoursesTabProps {
  enrolledCourses: EnrolledCourse[];
}

const MyCoursesTab = ({ enrolledCourses }: MyCoursesTabProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Mes cours</h2>
      
      {enrolledCourses.length > 0 ? (
        <div className="space-y-4">
          {enrolledCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <EmptyCourseState />
      )}
    </div>
  );
};

export default MyCoursesTab;
