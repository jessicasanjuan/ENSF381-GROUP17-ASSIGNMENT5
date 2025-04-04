import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CourseCatalog from "../components/CourseCatalog";
import EnrollmentList from "../components/EnrollmentList";

const CoursesPage = () => {
  return (
    <div className="courses-page">
      <Header />
      <main className="courses-main">
        <h2 className="page-title">Available Courses</h2>
        <CourseCatalog />
        <EnrollmentList />
      </main>
      <Footer />
    </div>
  );
};

export default CoursesPage;
