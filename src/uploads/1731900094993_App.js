import React from "react";
import "./App.css";
// import StudentJobMatching from "./front_end";
// import Student_JobMatching_System from "./modified_front_end"; // Import the StudentJobMatching component
import StudentJobPortal from "./login_details";
// import AcademicDetailsForm from "./academic_details";
function App() {
  return (
    <div className="App">
      {/* <Student_JobMatching_System /> Render the form component */}
      <StudentJobPortal />
      {/* <AcademicDetailsForm /> */}
    </div>
  );
}

export default App;
