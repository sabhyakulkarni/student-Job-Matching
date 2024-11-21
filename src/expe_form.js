import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faBriefcase,
  faCalendarAlt,
  faClock,
  faIdBadge,
} from "@fortawesome/free-solid-svg-icons";

const ExperienceForm = () => {
  const [experienceDetails, setExperienceDetails] = useState({
    SRN: "",
    Company: "",
    Role: "",
    Start_time: "",
    End_time: "",
    Duration: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(`Updating ${name}: ${value}`); // Debugging log
    setExperienceDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting experience details:", experienceDetails); // Debugging log
    try {
      const response = await fetch("http://localhost:3000/add_experience", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(experienceDetails),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Experience details added successfully!");
        setExperienceDetails({
          SRN: "",
          Company: "",
          Role: "",
          Start_time: "",
          End_time: "",
          Duration: "",
        });
      } else {
        alert(data.message || "An error occurred.");
      }
    } catch (error) {
      console.error("Error submitting experience details:", error);
      alert("An error occurred. Please try again.");
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
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Add Experience
      </h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <FontAwesomeIcon icon={faIdBadge} />
          <input
            type="text"
            name="SRN"
            placeholder="Student SRN"
            value={experienceDetails.SRN}
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
          <FontAwesomeIcon icon={faBuilding} />
          <input
            type="text"
            name="Company"
            placeholder="Company Name"
            value={experienceDetails.Company}
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
          <FontAwesomeIcon icon={faBriefcase} />
          <input
            type="text"
            name="Role"
            placeholder="Role"
            value={experienceDetails.Role}
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
          <FontAwesomeIcon icon={faCalendarAlt} />
          <input
            type="date"
            name="Start_time"
            placeholder="Start Date"
            value={experienceDetails.Start_time}
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
          <FontAwesomeIcon icon={faCalendarAlt} />
          <input
            type="date"
            name="End_time"
            placeholder="End Date"
            value={experienceDetails.End_time}
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
          <FontAwesomeIcon icon={faClock} />
          <input
            type="number"
            name="Duration"
            placeholder="Duration (months)"
            value={experienceDetails.Duration}
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
          Submit
        </button>
      </form>
    </div>
  );
};

export default ExperienceForm;
