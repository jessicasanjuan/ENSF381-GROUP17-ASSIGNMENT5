import React, { useState, useEffect } from "react";
import CourseItem from "./CourseItem";
import courses from "../data/courses";

const CourseCatalog = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("enrollments");
    if (stored) {
      setEnrolledCourses(JSON.parse(stored));
    }
  }, []);

  const handleEnroll = (course) => {
    const isAlreadyEnrolled = enrolledCourses.some((c) => c.id === course.id);
    if (!isAlreadyEnrolled) {
      const updated = [...enrolledCourses, course];
      localStorage.setItem("enrollments", JSON.stringify(updated));
      setEnrolledCourses(updated);
  
      //force refresh EnrollmentList if on same page
      window.dispatchEvent(new Event("storage"));
    }
  };
  

  return (
    <div className="courses-grid">
      {courses.map((course) => (
        <CourseItem key={course.id} course={course} onEnroll={handleEnroll} />
      ))}
    </div>
  );
};

export default CourseCatalog;
