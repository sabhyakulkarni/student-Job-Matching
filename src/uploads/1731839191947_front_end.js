import React, { useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Add FontAwesome icons to the library
library.add(fas);

function StudentDetailsForm() {
  const [formData, setFormData] = useState({
    experience: [],
    academicDetails: [],
    achievements: [],
    skills: [],
    loginDetails: { username: "", password: "" },
    student: { srn: "", name: "", dob: "", mobile: "", email: "" },
    studentAcademicSkills: [],
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  const handleDynamicChange = (index, e, field, section) => {
    const updatedSection = [...formData[section]];
    updatedSection[index][field] = e.target.value;
    setFormData((prev) => ({ ...prev, [section]: updatedSection }));
  };

  const addDynamicField = (section) => {
    const newField = {};
    setFormData((prev) => ({
      ...prev,
      [section]: [...prev[section], newField],
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData.loginDetails), // Send loginDetails directly
      });
      const data = await response.json();
      if (response.ok) {
        alert("Registration successful!");
      } else {
        alert(data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", fontFamily: "Arial" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        Student Details Form
      </h1>

      {/* Login Details Section */}
      {!isLoggedIn ? (
        <>
          <h2>Register Details</h2>
          <div style={sectionStyle}>
            <form onSubmit={handleRegister}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <FontAwesomeIcon
                  icon={["fas", "user"]}
                  style={{ marginRight: "8px", color: "#007bff" }}
                />
                <label>Username:</label>
              </div>
              <input
                type="text"
                name="username"
                value={formData.loginDetails.username}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    loginDetails: {
                      ...prev.loginDetails,
                      username: e.target.value,
                    },
                  }))
                }
                placeholder="Enter Username"
                required
                style={inputStyle}
              />

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <FontAwesomeIcon
                  icon={["fas", "key"]}
                  style={{ marginRight: "8px", color: "#007bff" }}
                />
                <label>Password:</label>
              </div>
              <input
                type="password"
                name="password"
                value={formData.loginDetails.password}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    loginDetails: {
                      ...prev.loginDetails,
                      password: e.target.value,
                    },
                  }))
                }
                placeholder="Enter Password"
                required
                style={inputStyle}
              />

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <FontAwesomeIcon
                  icon={["fas", "id-card"]}
                  style={{ marginRight: "8px", color: "#007bff" }}
                />
                <label>SRN:</label>
              </div>
              <input
                type="text"
                name="srn"
                value={formData.loginDetails.srn}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    loginDetails: { ...prev.loginDetails, srn: e.target.value },
                  }))
                }
                placeholder="Enter SRN"
                required
                style={inputStyle}
              />

              <button type="submit" style={buttonStyle}>
                Register
              </button>
            </form>
          </div>
        </>
      ) : (
        <> </>
      )}
      {/* Student Details */}
      <h2>Student Details</h2>
      <div style={sectionStyle}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <FontAwesomeIcon
            icon={["fas", "id-card"]}
            style={{ marginRight: "8px", color: "#007bff" }}
          />
          <label>SRN:</label>
        </div>
        <input
          type="text"
          name="srn"
          value={formData.student.srn}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              student: { ...prev.student, srn: e.target.value },
            }))
          }
          placeholder="Enter SRN"
          required
          style={inputStyle}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <FontAwesomeIcon
            icon={["fas", "user"]}
            style={{ marginRight: "8px", color: "#007bff" }}
          />
          <label>Name:</label>
        </div>
        <input
          type="text"
          name="name"
          value={formData.student.name}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              student: { ...prev.student, name: e.target.value },
            }))
          }
          placeholder="Enter Name"
          required
          style={inputStyle}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <FontAwesomeIcon
            icon={["fas", "calendar-alt"]}
            style={{ marginRight: "8px", color: "#007bff" }}
          />
          <label>DOB:</label>
        </div>
        <input
          type="date"
          name="dob"
          value={formData.student.dob}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              student: { ...prev.student, dob: e.target.value },
            }))
          }
          required
          style={inputStyle}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <FontAwesomeIcon
            icon={["fas", "phone-alt"]}
            style={{ marginRight: "8px", color: "#007bff" }}
          />
          <label>Mobile:</label>
        </div>
        <input
          type="text"
          name="mobile"
          value={formData.student.mobile}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              student: { ...prev.student, mobile: e.target.value },
            }))
          }
          placeholder="Enter Mobile"
          required
          style={inputStyle}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <FontAwesomeIcon
            icon={["fas", "envelope"]}
            style={{ marginRight: "8px", color: "#007bff" }}
          />
          <label>Email:</label>
        </div>
        <input
          type="email"
          name="email"
          value={formData.student.email}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              student: { ...prev.student, email: e.target.value },
            }))
          }
          placeholder="Enter Email"
          required
          style={inputStyle}
        />
      </div>

      {/* Academic Details */}
      <h2>Academic Details</h2>
      <button
        type="button"
        onClick={() => addDynamicField("academicDetails")}
        style={buttonStyle}
      >
        Add Academic Detail
      </button>
      {formData.academicDetails.map((detail, index) => (
        <div key={index} style={sectionStyle}>
          {/* Degree Input */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <FontAwesomeIcon
              icon={["fas", "graduation-cap"]}
              style={{ marginRight: "8px", color: "#007bff" }}
            />
            <label>Degree:</label>
          </div>
          <input
            type="text"
            name="degree"
            placeholder="Enter Degree"
            value={detail.degree || ""}
            onChange={(e) =>
              handleDynamicChange(index, e, "degree", "academicDetails")
            }
            required
            style={inputStyle}
          />

          {/* SSC Year Input */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <FontAwesomeIcon
              icon={["fas", "calendar-alt"]}
              style={{ marginRight: "8px", color: "#007bff" }}
            />
            <label>SSC Year:</label>
          </div>
          <input
            type="number"
            name="ssc_year"
            value={detail.ssc_year || ""}
            onChange={(e) =>
              handleDynamicChange(index, e, "ssc_year", "academicDetails")
            }
            placeholder="Enter SSC Year"
            required
            style={inputStyle}
          />

          {/* SSC Percentage Input */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <FontAwesomeIcon
              icon={["fas", "percentage"]}
              style={{ marginRight: "8px", color: "#007bff" }}
            />
            <label>SSC Percentage:</label>
          </div>
          <input
            type="number"
            name="ssc_percentage"
            value={detail.ssc_percentage || ""}
            onChange={(e) =>
              handleDynamicChange(index, e, "ssc_percentage", "academicDetails")
            }
            placeholder="Enter SSC Percentage"
            required
            style={inputStyle}
          />

          {/* HSC Year Input */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <FontAwesomeIcon
              icon={["fas", "calendar-alt"]}
              style={{ marginRight: "8px", color: "#007bff" }}
            />
            <label>HSC Year:</label>
          </div>
          <input
            type="number"
            name="hsc_year"
            value={detail.hsc_year || ""}
            onChange={(e) =>
              handleDynamicChange(index, e, "hsc_year", "academicDetails")
            }
            placeholder="Enter HSC Year"
            required
            style={inputStyle}
          />

          {/* HSC Percentage Input */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <FontAwesomeIcon
              icon={["fas", "percentage"]}
              style={{ marginRight: "8px", color: "#007bff" }}
            />
            <label>HSC Percentage:</label>
          </div>
          <input
            type="number"
            name="hsc_percentage"
            value={detail.hsc_percentage || ""}
            onChange={(e) =>
              handleDynamicChange(index, e, "hsc_percentage", "academicDetails")
            }
            placeholder="Enter HSC Percentage"
            required
            style={inputStyle}
          />
        </div>
      ))}

      {/* Achievements */}
      <h2>Achievements</h2>
      {/* Add Achievement Button */}
      <button
        type="button"
        onClick={() => addDynamicField("achievements")}
        style={buttonStyle}
      >
        Add Achievement
      </button>
      {formData.achievements.map((achievement, index) => (
        <div key={index} style={sectionStyle}>
          {/* Achievement Name */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <FontAwesomeIcon
              icon={["fas", "trophy"]}
              style={{ marginRight: "8px", color: "#007bff" }}
            />
            <label>Achievement Name:</label>
          </div>
          <input
            type="text"
            name="name"
            placeholder="Enter Achievement Name"
            value={achievement.name || ""}
            onChange={(e) =>
              handleDynamicChange(index, e, "name", "achievements")
            }
            required
            style={inputStyle}
          />

          {/* Achievement Description */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <FontAwesomeIcon
              icon={["fas", "clipboard-list"]}
              style={{ marginRight: "8px", color: "#007bff" }}
            />
            <label>Description:</label>
          </div>
          <textarea
            name="description"
            placeholder="Enter Achievement Description"
            value={achievement.description || ""}
            onChange={(e) =>
              handleDynamicChange(index, e, "description", "achievements")
            }
            required
            style={{ ...inputStyle, height: "100px" }}
          />
        </div>
      ))}

      {/* Experience Details */}
      <h2>Experience</h2>
      {/* Add Experience Button */}
      <button
        type="button"
        style={buttonStyle}
        onClick={() => addDynamicField("experience")}
      >
        Add Experience
      </button>
      {formData.experience.map((exp, index) => (
        <div key={index} style={sectionStyle}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <FontAwesomeIcon
              icon={["fas", "building"]}
              style={{ marginRight: "8px", color: "#007bff" }}
            />
            <label>Company:</label>
          </div>
          <input
            type="text"
            name="company"
            value={exp.company || ""}
            onChange={(e) =>
              handleDynamicChange(index, e, "company", "experience")
            }
            placeholder="Enter Company Name"
            required
            style={inputStyle}
          />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <FontAwesomeIcon
              icon={["fas", "briefcase"]}
              style={{ marginRight: "8px", color: "#007bff" }}
            />
            <label>Role:</label>
          </div>
          <input
            type="text"
            name="role"
            value={exp.role || ""}
            onChange={(e) =>
              handleDynamicChange(index, e, "role", "experience")
            }
            placeholder="Enter Role"
            required
            style={inputStyle}
          />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <FontAwesomeIcon
              icon={["fas", "calendar-alt"]}
              style={{ marginRight: "8px", color: "#007bff" }}
            />
            <label>Start Time:</label>
          </div>
          <input
            type="date"
            name="start_time"
            value={exp.start_time || ""}
            onChange={(e) =>
              handleDynamicChange(index, e, "start_time", "experience")
            }
            required
            style={inputStyle}
          />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <FontAwesomeIcon
              icon={["fas", "calendar-alt"]}
              style={{ marginRight: "8px", color: "#007bff" }}
            />
            <label>End Time:</label>
          </div>
          <input
            type="date"
            name="end_time"
            value={exp.end_time || ""}
            onChange={(e) =>
              handleDynamicChange(index, e, "end_time", "experience")
            }
            required
            style={inputStyle}
          />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <FontAwesomeIcon
              icon={["fas", "clock"]}
              style={{ marginRight: "8px", color: "#007bff" }}
            />
            <label>Duration (Months):</label>
          </div>
          <input
            type="number"
            name="duration"
            value={exp.duration || ""}
            onChange={(e) =>
              handleDynamicChange(index, e, "duration", "experience")
            }
            placeholder="Enter Duration (in months)"
            required
            style={inputStyle}
          />
        </div>
      ))}

      {/* Skills Section */}
      <h2>Skills</h2>
      <button
        type="button"
        onClick={() => addDynamicField("skills")}
        style={buttonStyle}
      >
        Add Skill
      </button>
      {formData.skills.map((skill, index) => (
        <div key={index} style={sectionStyle}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <FontAwesomeIcon
              icon={["fas", "tools"]}
              style={{ marginRight: "8px", color: "#007bff" }}
            />
            <label>Skill Name:</label>
          </div>
          <input
            type="text"
            name="skill_name"
            placeholder="Enter Skill Name"
            value={skill.name || ""}
            onChange={(e) => handleDynamicChange(index, e, "name", "skills")}
            required
            style={inputStyle}
          />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <FontAwesomeIcon
              icon={["fas", "tag"]}
              style={{ marginRight: "8px", color: "#007bff" }}
            />
            <label>Skill Type:</label>
          </div>
          <input
            type="text"
            name="skill_type"
            placeholder="Enter Skill Type"
            value={skill.type || ""}
            onChange={(e) => handleDynamicChange(index, e, "type", "skills")}
            required
            style={inputStyle}
          />

          {/* SRN is auto-included from the student section */}
          <input type="hidden" name="skill_srn" value={formData.student.srn} />
        </div>
      ))}

      {/* Submit Button */}
      <div style={{ textAlign: "center" }}>
        <button type="submit" style={buttonStyle}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default StudentDetailsForm;
