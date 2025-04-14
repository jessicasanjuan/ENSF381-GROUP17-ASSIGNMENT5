import React, { useEffect, useState } from "react";
import EnrolledCourse from "./EnrolledCourse";

const EnrollmentList = () => {
  const [enrolled, setEnrolled] = useState([]);
  const id = 1;

  useEffect(() => {
    fetch(`http://localhost:5000/student_courses/${id}`)
    .then(response => { return response.json(); })
    .then(data => {
      setEnrolled(data)
  })
  .catch(error => console.log('Error.'));
  }, []);

  const handleDrop = (course) => {
    fetch(`http://localhost:5000/drop/${window.student_id}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(course),
    })
    .then(response => { return response.json(); })
    .then(data => {
      const updated = enrolled.filter((c) => c.id !== course.id);
      setEnrolled(updated);
      console.log(data.message)
  })
  .catch(error => console.log('Error.'));
  };

  // assuming 3 hours a week
  const totalDurationHours = enrolled.reduce((sum, c) => {
    const weeks = parseInt(c.duration);
    return sum + (isNaN(weeks) ? 0 : weeks * 3);
  }, 0);

  return (
    <section className="enrollment-section">
      <h2 className="page-title">
        Enrolled Courses <span>({enrolled.length})</span>
      </h2>
      {enrolled.length === 0 ? (
        <p className="enrollment-empty">You are not enrolled in any courses yet.</p>
      ) : (
        <>
          {enrolled.map((course) => (
            <div key={course.id} className="enrolled-course">
              <h3>{course.name}</h3>
              <p><strong>Duration:</strong> {course.duration}</p>
              <button className="drop-button" onClick={() => handleDrop(course)}>Drop Course</button>
            </div>
          ))}
          <p><strong>Total Hours:</strong> {totalDurationHours} hours</p>
        </>
      )}
    </section>
  );
};

export default EnrollmentList;
