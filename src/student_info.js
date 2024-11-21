import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faIdBadge,
  faUser,
  faCalendarAlt,
  faPhone,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

const StudentForm = () => {
  const [studentDetails, setStudentDetails] = useState({
    SRN: "",
    Name: "",
    DOB: "",
    Mobile: "",
    Email: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/add_student", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(studentDetails),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Student information added successfully!");
        setStudentDetails({
          SRN: "",
          Name: "",
          DOB: "",
          Mobile: "",
          Email: "",
        });
      } else {
        alert(data.message || "An error occurred.");
      }
    } catch (error) {
      console.error("Error submitting student information:", error);
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
        Add Student Information
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
            value={studentDetails.SRN}
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
          <FontAwesomeIcon icon={faUser} />
          <input
            type="text"
            name="Name"
            placeholder="Full Name"
            value={studentDetails.Name}
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
            name="DOB"
            value={studentDetails.DOB}
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
          <FontAwesomeIcon icon={faPhone} />
          <input
            type="text"
            name="Mobile"
            placeholder="Mobile Number"
            value={studentDetails.Mobile}
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
          <FontAwesomeIcon icon={faEnvelope} />
          <input
            type="email"
            name="Email"
            placeholder="Email Address"
            value={studentDetails.Email}
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

export default StudentForm;
