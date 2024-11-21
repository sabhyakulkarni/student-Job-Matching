import React, { useState, useEffect } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(fas);

function Student_JobMatching_System() {
  const [formData, setFormData] = useState({
    resume: null,
    skills: [],
    jobSearchResults: [],
    appliedJobs: [],
  });

  const inputStyle = {
    width: "100%",
    padding: "10px",
    margin: "5px 0 15px 0",
    border: "1px solid #ccc",
    borderRadius: "4px",
  };
  const sectionStyle = {
    marginBottom: "20px",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
  };
  const buttonStyle = {
    marginTop: "10px",
    backgroundColor: "#28a745",
    color: "#fff",
    padding: "10px 15px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
  };

  const handleFileUpload = (e) => {
    setFormData({ ...formData, resume: e.target.files[0] });
  };

  const handleSearchJobs = async () => {
    try {
      const response = await fetch("http://localhost:3000/search_jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skills: formData.skills }),
      });
      const jobs = await response.json();
      setFormData({ ...formData, jobSearchResults: jobs });
    } catch (error) {
      console.error("Error searching jobs:", error);
    }
  };

  const handleApplyJob = async (jobId) => {
    try {
      const response = await fetch(`http://localhost:3000/apply_job/${jobId}`, {
        method: "POST",
      });
      const message = await response.json();
      alert(message.message);
    } catch (error) {
      console.error("Error applying for job:", error);
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", fontFamily: "Arial" }}>
      <h1>Student Job Matching System</h1>

      <section style={sectionStyle}>
        <h2>Upload Resume</h2>
        <input type="file" onChange={handleFileUpload} />
        <button
          style={buttonStyle}
          onClick={() => {
            // Add resume upload logic here
          }}
        >
          Upload
        </button>
      </section>

      <section style={sectionStyle}>
        <h2>Search Jobs</h2>
        <input
          type="text"
          placeholder="Enter skills (comma-separated)"
          onChange={(e) =>
            setFormData({ ...formData, skills: e.target.value.split(",") })
          }
        />
        <button style={buttonStyle} onClick={handleSearchJobs}>
          Search
        </button>
        <div>
          {formData.jobSearchResults.map((job) => (
            <div key={job.id} style={{ marginBottom: "10px" }}>
              <h3>{job.title}</h3>
              <p>{job.description}</p>
              <button
                style={buttonStyle}
                onClick={() => handleApplyJob(job.id)}
              >
                Apply
              </button>
            </div>
          ))}
        </div>
      </section>

      <section style={sectionStyle}>
        <h2>Applied Jobs</h2>
        <div>
          {formData.appliedJobs.map((job) => (
            <div key={job.id} style={{ marginBottom: "10px" }}>
              <h3>{job.title}</h3>
              <p>{job.status}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Student_JobMatching_System;
