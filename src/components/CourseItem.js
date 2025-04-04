import React, { useState } from "react";

const CourseItem = ({ course, onEnroll }) => {
  const [showDescription, setShowDescription] = useState(false);

  return (
    <div
      className="course-card"
      onMouseEnter={() => setShowDescription(true)}
      onMouseLeave={() => setShowDescription(false)}
    >
      <img src={course.image} alt={course.name} className="course-image" />
      <div className="course-info">
        <h3 className="course-title">{course.name}</h3>
        <p className="course-instructor">{course.instructor}</p>
        {showDescription && (
          <p className="course-description">{course.description}</p>
        )}
        <button className="enroll-button" onClick={() => onEnroll(course)}>
          Enroll Now
        </button>
      </div>
    </div>
  );
};

export default CourseItem;
