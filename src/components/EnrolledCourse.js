import React from "react";

const EnrolledCourse = ({ course, onDrop }) => {
  return (
    <div className="enrolled-course">
      <h4>{course.name}</h4>
      <p>Credit Hours: {course.credit || 3}</p>
      <button onClick={() => onDrop(course)}>Drop Course</button>
    </div>
  );
};

export default EnrolledCourse;
