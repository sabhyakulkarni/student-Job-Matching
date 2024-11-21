import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import StudentJobPortal from "./login_details"; // Your existing login page
import StudentStatistics from "./student_stats";
import StudentsWithDegrees from "./st_count";
import StudentsWithoutAchievements from "./stud_ach";
import JobsForStudent from "./get_jobs";
function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Login</Link> |{" "}
        <Link to="/statistics">View Statistics</Link>
      </nav>
      <Routes>
        <Route path="/" element={<StudentJobPortal />} />
        <Route path="/statistics" element={<StudentStatistics />} />
        <Route path="/statistics" element={<StudentsWithDegrees />} />
        <Route path="/statistics" element={<StudentsWithoutAchievements />} />
        <Route path="/statistics" element={<JobsForStudent />} />
      </Routes>
    </Router>
  );
}

export default App;
