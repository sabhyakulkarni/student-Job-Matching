import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGraduationCap,
  faBuilding,
  faCalendarAlt,
  faPercentage,
  faIdBadge,
} from "@fortawesome/free-solid-svg-icons";

const AcademicDetailsForm = ({ srn }) => {
  const [academicDetails, setAcademicDetails] = useState({
    SRN: srn || "", // Automatically populate SRN if available
    Degree: "",
    Department: "",
    SSC_year: "",
    SSC_percentage: "",
    HSC_year: "",
    HSC_percentage: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAcademicDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:3000/add_academic_details",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(academicDetails),
        }
      );

      const data = await response.json();
      if (response.ok) {
        alert("Academic details submitted successfully!");
      } else {
        alert(data.message || "An error occurred.");
      }
    } catch (error) {
      console.error("Error submitting academic details:", error);
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
        Enter Academic Details
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
            placeholder="SRN"
            value={academicDetails.SRN}
            onChange={handleInputChange}
            style={{
              flex: 1,
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
            readOnly={!!srn} // Make SRN read-only if passed as a prop
            required
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <FontAwesomeIcon icon={faGraduationCap} />
          <input
            type="text"
            name="Degree"
            placeholder="Degree"
            value={academicDetails.Degree}
            onChange={handleInputChange}
            style={{
              flex: 1,
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
            required
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <FontAwesomeIcon icon={faBuilding} />
          <input
            type="text"
            name="Department"
            placeholder="Department"
            value={academicDetails.Department}
            onChange={handleInputChange}
            style={{
              flex: 1,
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
            required
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <FontAwesomeIcon icon={faCalendarAlt} />
          <input
            type="number"
            name="SSC_year"
            placeholder="SSC Year"
            value={academicDetails.SSC_year}
            onChange={handleInputChange}
            style={{
              flex: 1,
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
            required
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <FontAwesomeIcon icon={faPercentage} />
          <input
            type="number"
            step="0.01"
            name="SSC_percentage"
            placeholder="SSC Percentage"
            value={academicDetails.SSC_percentage}
            onChange={handleInputChange}
            style={{
              flex: 1,
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
            required
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <FontAwesomeIcon icon={faCalendarAlt} />
          <input
            type="number"
            name="HSC_year"
            placeholder="HSC Year"
            value={academicDetails.HSC_year}
            onChange={handleInputChange}
            style={{
              flex: 1,
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
            required
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <FontAwesomeIcon icon={faPercentage} />
          <input
            type="number"
            step="0.01"
            name="HSC_percentage"
            placeholder="HSC Percentage"
            value={academicDetails.HSC_percentage}
            onChange={handleInputChange}
            style={{
              flex: 1,
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
            required
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

export default AcademicDetailsForm;
