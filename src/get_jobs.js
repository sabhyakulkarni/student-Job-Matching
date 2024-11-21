// PROCEDURE/FUCNTION
import React, { useState, useEffect } from "react";

const JobsForStudent = ({ srn }) => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/get_jobs/${srn}`)
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .catch((err) => console.error(err));
  }, [srn]);

  return (
    <div>
      <h2>Jobs for Your Skills</h2>
      {jobs.length > 0 ? (
        jobs.map((job, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              margin: "10px",
              padding: "10px",
            }}
          >
            <h3>{job.Title}</h3>
            <p>
              <strong>Description:</strong> {job.Description}
            </p>
            <p>
              <strong>Skills Required:</strong> {job.Skills_Required}
            </p>
          </div>
        ))
      ) : (
        <p>No matching jobs found.</p>
      )}
    </div>
  );
};

export default JobsForStudent;
