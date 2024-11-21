const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");

const app = express();
app.use(bodyParser.json());

// Configure MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Elita@2004#",
  database: "student_job_matching",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to the database.");
});

// API to handle registration
app.post("/register", (req, res) => {
  const { username, password } = req.body;

  // Validate input
  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  // Insert user into the database
  const query = "INSERT INTO login_details (username, password) VALUES (?, ?)";
  db.query(query, [username, password], (err, results) => {
    if (err) {
      console.error("Error inserting user:", err);
      return res.status(500).json({ message: "Database error." });
    }
    res.status(200).json({ message: "User registered successfully." });
  });
});

app.post("/stud_det", (req, res) => {
  const { SRN, Name, DOB, Mobile, Email } = req.body;

  // Validate input
  if (!SRN || !Name || !DOB || !Mobile || !Email) {
    return res.status(400).json({ message: "All fields are required." });
  }

  // Insert user into the database
  const query =
    "INSERT INTO student (SRN, Name , DOB , Mobile , Email) VALUES (?, ?,?,?,?)";
  db.query(query, [SRN, Name, DOB, Mobile, Email], (err, results) => {
    if (err) {
      console.error("Error inserting user:", err);
      return res.status(500).json({ message: "Database error." });
    }
  });
});

app.post("/academic_details", (req, res) => {
  const { Degree, SSC_Year, SSC_Percentage, HSC_Year, HSC_Percentage } =
    req.body;

  // Validate input
  if (!Degree || !SSC_Year || !SSC_Percentage || !HSC_Year || !HSC_Percentage) {
    return res.status(400).json({ message: "All fields are required." });
  }

  // Insert user into the database
  const query =
    "INSERT INTO academic_details (Degree, SSC_Year, SSC_Percentage, HSC_Year, HSC_Percentage) VALUES (?, ?,?,?,?)";
  db.query(
    query,
    [Degree, SSC_Year, SSC_Percentage, HSC_Year, HSC_Percentage],
    (err, results) => {
      if (err) {
        console.error("Error inserting user:", err);
        return res.status(500).json({ message: "Database error." });
      }
    }
  );
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

const cors = require("cors");
app.use(cors());
