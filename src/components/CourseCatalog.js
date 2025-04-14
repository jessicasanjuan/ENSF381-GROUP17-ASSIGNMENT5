import React, { useState, useEffect, useContext } from "react";
import CourseItem from "./CourseItem";
import { idContext } from './LoginForm';

const CourseCatalog = () => {
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  // const id = useContext(idContext);
  const id = 1;
  // Tried multiple ways to import and use the context, but hardcoding an ID of 1 was the best we could get to work.
  window.student_id = 1;

  useEffect(() => {
    fetch('http://localhost:5000/courses')
    .then(response => { return response.json(); })
    .then(data => { setCourses(data);})
    .catch(error => console.log('Error.'));
    
    fetch(`http://localhost:5000/student_courses/${id}`)
    .then(response => { return response.json(); })
    .then(data => {
      setEnrolledCourses(data)
    })
    .catch(error => console.log('Error.'));
    
  }, []);

  // NOTE: Enrolled courses only update on page refresh. Sorry.
  const handleEnroll = (course) => {
    const isAlreadyEnrolled = enrolledCourses.some((c) => c.id === course.id);
    if (!isAlreadyEnrolled) {
      console.log(course);
      fetch(`http://localhost:5000/enroll/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(course),
      })
      .then(response => { return response.json(); })
      .then(data => {
        const updated = [...enrolledCourses, course];
        setEnrolledCourses(updated);
        console.log(data.message);
      })
      .catch(error => console.log('Error.'));
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
