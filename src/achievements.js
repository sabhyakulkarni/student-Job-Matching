import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faIdBadge,
  faTrophy,
  faFileAlt,
} from "@fortawesome/free-solid-svg-icons";

const AchievementForm = () => {
  const [achievementDetails, setAchievementDetails] = useState({
    SRN: "",
    Name: "",
    Description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAchievementDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/add_achievement", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(achievementDetails),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Achievement added successfully!");
        setAchievementDetails({
          SRN: "",
          Name: "",
          Description: "",
        });
      } else {
        alert(data.message || "An error occurred.");
      }
    } catch (error) {
      console.error("Error submitting achievement details:", error);
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
        Add Achievement
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
            value={achievementDetails.SRN}
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
          <FontAwesomeIcon icon={faTrophy} />
          <input
            type="text"
            name="Name"
            placeholder="Achievement Name"
            value={achievementDetails.Name}
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
        <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
          <FontAwesomeIcon icon={faFileAlt} />
          <textarea
            name="Description"
            placeholder="Achievement Description"
            value={achievementDetails.Description}
            onChange={handleInputChange}
            required
            style={{
              flex: 1,
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              height: "100px",
            }}
          ></textarea>
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

export default AchievementForm;
