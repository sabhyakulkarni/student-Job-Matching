import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import AcademicDetailsForm from "./academic_details";
import ExperienceForm from "./expe_form";
import AchievementForm from "./achievements";
import StudentForm from "./student_info";
import StudentCountByDegree from "./st_count";

// Add Font Awesome icons to the library
library.add(fas);

function StudentJobPortal() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    srn: "",
  });

  const [isLogin, setIsLogin] = useState(true); // Toggle between login and registration
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Check if the user is logged in

  const [skills, setSkills] = useState(""); // State to store user-entered skills
  const [jobData, setJobData] = useState([]); // Store job search results
  const [resume, setResume] = useState(null); // Store the uploaded resume

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? "/login" : "/register";
    try {
      const response = await fetch(`http://localhost:3000${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        setIsAuthenticated(true); // Enable access to additional features
      } else {
        alert(data.message || "An error occurred.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Sorry!");
    }
  };

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    setResume(file);
    const formData = new FormData();
    formData.append("resume", file);

    try {
      const response = await fetch("http://localhost:3000/upload_resume", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error("Error uploading resume:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleJobSearch = async () => {
    console.log("Skills being sent to the backend:", skills); // Debugging
    try {
      const response = await fetch("http://localhost:3000/search_jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          skills: skills.split(",").map((s) => s.trim()), // Convert skills to an array
        }),
      });

      const jobs = await response.json();
      setJobData(jobs); // Save job results to state
    } catch (error) {
      console.error("Error searching jobs:", error);
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "20px auto",
        fontFamily: "Arial",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      {!isAuthenticated ? (
        <div>
          <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
            {isLogin ? "Login" : "Register"}
          </h1>
          <form
            onSubmit={handleFormSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "15px" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <FontAwesomeIcon icon={["fas", "user"]} />
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleInputChange}
                required
                style={{
                  flex: 1,
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <FontAwesomeIcon icon={["fas", "lock"]} />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
                style={{
                  flex: 1,
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />
            </div>
            {!isLogin && (
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <FontAwesomeIcon icon={["fas", "id-card"]} />
                <input
                  type="text"
                  name="srn"
                  placeholder="SRN"
                  value={formData.srn}
                  onChange={handleInputChange}
                  required
                  style={{
                    flex: 1,
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                />
              </div>
            )}
            <button
              type="submit"
              style={{
                backgroundColor: "#007BFF",
                color: "white",
                padding: "10px",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              {isLogin ? "Login" : "Register"}
            </button>
          </form>
          <button
            onClick={() => setIsLogin(!isLogin)}
            style={{
              marginTop: "15px",
              backgroundColor: "#6c757d",
              color: "white",
              padding: "10px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Switch to {isLogin ? "Register" : "Login"}
          </button>
        </div>
      ) : (
        <div>
          <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
            Welcome to the Student Job Portal
          </h1>
          <section style={{ marginBottom: "20px" }}>
            <h2>
              <FontAwesomeIcon
                icon={["fas", "upload"]}
                style={{ marginRight: "8px" }}
              />
              Upload Resume
            </h2>
            <input
              type="file"
              onChange={handleResumeUpload}
              style={{
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </section>
          <StudentForm />
          <AcademicDetailsForm />
          <AchievementForm />
          <ExperienceForm />
          {/* <StudentCountByDegree /> */}
          <section style={{ marginBottom: "20px" }}>
            <h2>
              <FontAwesomeIcon
                icon={["fas", "search"]}
                style={{ marginRight: "8px" }}
              />
              Search Jobs
            </h2>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <input
                type="text"
                placeholder="Enter skills (e.g., JavaScript, React)"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                style={{
                  flex: 1,
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />
              <button
                onClick={handleJobSearch}
                style={{
                  backgroundColor: "#28a745",
                  color: "white",
                  padding: "10px",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Search
              </button>
            </div>
          </section>
          <section>
            <h2>
              <FontAwesomeIcon
                icon={["fas", "briefcase"]}
                style={{ marginRight: "8px" }}
              />
              Job Results
            </h2>
            <div>
              {jobData.length > 0 ? (
                jobData.map((job, index) => (
                  <div
                    key={index}
                    style={{
                      border: "1px solid #ccc",
                      margin: "10px 0",
                      padding: "10px",
                      borderRadius: "4px",
                    }}
                  >
                    <h3>{job.Title}</h3>
                    <p>
                      <strong>Description:</strong> {job.Description}
                    </p>
                    <p>
                      <strong>Skills Required:</strong> {job.Skills_Required}
                    </p>
                    <p>
                      <strong>Posted Date:</strong> {job.Posted_Date}
                    </p>
                  </div>
                ))
              ) : (
                <p>No jobs found. Try searching with different skills.</p>
              )}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default StudentJobPortal;
