import React, { useEffect, useState } from "react";

const MainSection = () => {
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [randomTestimonials, setRandomTestimonials] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/courses')
    .then(response => { return response.json(); })
    .then(data => { setFeaturedCourses(data.sort(() => 0.5 - Math.random()).slice(0, 3)) })
    .catch(error => console.log('Error.'));

    fetch('http://localhost:5000/testimonials')
    .then(response => { return response.json(); })
    .then(data => { setRandomTestimonials(data.sort(() => 0.5 - Math.random()).slice(0, 2)) })
    .catch(error => console.log('Error.'));
     
  }, []);

  return (
    <main id="index-main">
      <h2>About LMS</h2>
      <p>
        The Learning Management System (LMS) helps students and instructors manage
        courses, quizzes, and track performance efficiently.
      </p>

      <h3>Featured Courses</h3>
      {featuredCourses.map((course) => (
        <div key={course.id} className="course-description">
          <p><strong>{course.name}</strong></p>
          <p>{course.instructor}</p>
        </div>
      ))}

      <h3>Student Testimonials</h3>
      {randomTestimonials.map((t, index) => (
        <div key={index} className="testimonial">
          <p><strong>{t.studentName}</strong></p>
          <p>{t.review}</p>
          <p>{"★".repeat(t.rating)}{"☆".repeat(5 - t.rating)}</p>
        </div>
      ))}
    </main>
  );
};

export default MainSection;
