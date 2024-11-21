const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");
const path = require("path");
const multer = require("multer");

const app = express();
app.use(bodyParser.json());
app.use(cors());

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
  const { username, password, srn } = req.body;

  if (!username || !password || !srn) {
    return res.status(400).json({ message: "All fields are required." });
  }

  // Check if SRN exists in the student table
  const checkStudentQuery = "SELECT SRN FROM student WHERE SRN = ?";
  db.query(checkStudentQuery, [srn], (err, results) => {
    if (err) {
      console.error("Error checking student existence:", err);
      return res.status(500).json({ message: "Database error." });
    }

    if (results.length === 0) {
      // If SRN does not exist, insert it into the student table
      const insertStudentQuery = `
        INSERT INTO student (SRN, Name, DOB, Mobile, Email)
        VALUES (?, 'Unknown', '2000-01-01', '0000000000', 'unknown@example.com');
      `;
      db.query(insertStudentQuery, [srn], (err) => {
        if (err) {
          console.error("Error inserting student record:", err);
          return res
            .status(500)
            .json({ message: "Failed to insert student record." });
        }

        console.log("Student record created successfully.");
        insertLoginDetails(); // Proceed to insert login details
      });
    } else {
      // If SRN exists, proceed to insert login details
      insertLoginDetails();
    }
  });

  // Function to insert login details
  const insertLoginDetails = () => {
    const query = `
      INSERT INTO login_details (Username, Password, SRN)
      VALUES (?, ?, ?)
    `;
    db.query(query, [username, password, srn], (err) => {
      if (err) {
        console.error("Error inserting login details:", err);
        return res
          .status(500)
          .json({ message: "Failed to insert login details." });
      }
      res.status(200).json({ message: "Registration successful." });
    });
  };
});

// API to handle login
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const query =
    "SELECT * FROM login_details WHERE Username = ? AND Password = ?";
  db.query(query, [username, password], (err, results) => {
    if (err) {
      console.error("Error during login:", err);
      return res.status(500).json({ message: "Database error." });
    }

    if (results.length > 0) {
      res
        .status(200)
        .json({ message: "Login successful!", srn: results[0].SRN });
    } else {
      res.status(401).json({ message: "Invalid username or password." });
    }
  });
});

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Directory where files will be saved
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`); // Create a unique filename
  },
});

const upload = multer({ storage });

// Resume Upload API
app.post("/upload_resume", upload.single("resume"), (req, res) => {
  const { file } = req;

  if (!file) {
    return res.status(400).json({ message: "Resume file is required." });
  }

  const fileName = file.filename; // Extract the uploaded file's name
  const query =
    "INSERT INTO resumes (FileName, UploadTimestamp) VALUES (?, NOW())"; // Use NOW() for the timestamp

  db.query(query, [fileName], (err) => {
    if (err) {
      console.error("Error saving resume:", err);
      return res.status(500).json({ message: "Database error." });
    }
    res.status(200).json({
      message: "Resume uploaded successfully.",
      fileName,
    });
  });
});

// API to handle job search
app.post("/search_jobs", (req, res) => {
  console.log("Skills received from frontend:", req.body.skills); // Debugging
  const { skills } = req.body;

  if (!skills || skills.length === 0) {
    return res
      .status(400)
      .json({ error: "No skills provided for job search." });
  }

  const query = `
    SELECT * FROM jobs
    WHERE ${skills.map(() => "Skills_Required LIKE ?").join(" OR ")}
  `;

  const params = skills.map((skill) => `%${skill}%`); // Match partial skill strings

  db.query(query, params, (err, results) => {
    if (err) {
      console.error("Error retrieving jobs:", err);
      return res.status(500).json({ message: "Database error." });
    }

    // Send the jobs back to the frontend
    res.status(200).json(results);
  });
});

app.post("/add_academic_details", (req, res) => {
  const {
    SRN,
    Degree,
    Department,
    SSC_year,
    SSC_percentage,
    HSC_year,
    HSC_percentage,
  } = req.body;

  if (
    !SRN ||
    !Degree ||
    !Department ||
    !SSC_year ||
    !SSC_percentage ||
    !HSC_year ||
    !HSC_percentage
  ) {
    return res.status(400).json({ message: "All fields are required." });
  }

  // First, ensure the student exists in the `student` table
  const checkStudentQuery = "SELECT SRN FROM student WHERE SRN = ?";
  db.query(checkStudentQuery, [SRN], (err, results) => {
    if (err) {
      console.error("Error checking student existence:", err);
      return res.status(500).json({ message: "Database error." });
    }

    if (results.length === 0) {
      // If student does not exist, insert it with default values
      const insertStudentQuery = `
        INSERT INTO student (SRN, Name, DOB, Mobile, Email)
        VALUES (?, 'Unknown', '2000-01-01', '0000000000', 'unknown@example.com')
      `;
      db.query(insertStudentQuery, [SRN], (err) => {
        if (err) {
          console.error("Error inserting student:", err);
          return res.status(500).json({ message: "Failed to insert student." });
        }

        console.log("Student record created successfully.");
        insertAcademicDetails(); // Proceed to insert academic details
      });
    } else {
      // Student already exists, proceed to insert academic details
      insertAcademicDetails();
    }
  });

  // Function to insert academic details
  const insertAcademicDetails = () => {
    const query = `
      INSERT INTO academic_details (SRN, Degree, Department, SSC_year, SSC_percentage, HSC_year, HSC_percentage)
      VALUES (?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        Degree = VALUES(Degree),
        Department = VALUES(Department),
        SSC_year = VALUES(SSC_year),
        SSC_percentage = VALUES(SSC_percentage),
        HSC_year = VALUES(HSC_year),
        HSC_percentage = VALUES(HSC_percentage);
    `;

    db.query(
      query,
      [
        SRN,
        Degree,
        Department,
        SSC_year,
        SSC_percentage,
        HSC_year,
        HSC_percentage,
      ],
      (err) => {
        if (err) {
          console.error("Error inserting academic details:", err);
          return res
            .status(500)
            .json({ message: "Failed to insert academic details." });
        }
        res
          .status(200)
          .json({ message: "Academic details added successfully." });
      }
    );
  };
});

app.post("/add_experience", (req, res) => {
  const { SRN, Company, Role, Start_time, End_time, Duration } = req.body;

  if (!SRN || !Company || !Role || !Start_time || !End_time || !Duration) {
    return res.status(400).json({ message: "All fields are required." });
  }

  // Check if SRN exists in the student table
  const checkStudentQuery = "SELECT SRN FROM student WHERE SRN = ?";
  db.query(checkStudentQuery, [SRN], (err, results) => {
    if (err) {
      console.error("Error checking student existence:", err);
      return res.status(500).json({ message: "Database error." });
    }

    if (results.length === 0) {
      return res.status(400).json({
        message:
          "SRN does not exist in the student table. Please register the student first.",
      });
    }

    // Proceed to insert experience details
    const insertExperienceQuery = `
      INSERT INTO experience (Company, Role, Start_time, End_time, Duration, SRN)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
      insertExperienceQuery,
      [Company, Role, Start_time, End_time, Duration, SRN],
      (err) => {
        if (err) {
          console.error("Error inserting experience details:", err);
          return res
            .status(500)
            .json({ message: "Failed to insert experience details." });
        }
        res
          .status(200)
          .json({ message: "Experience details added successfully." });
      }
    );
  });
});

app.post("/add_achievement", (req, res) => {
  const { SRN, Name, Description } = req.body;

  if (!SRN || !Name || !Description) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const checkStudentQuery = "SELECT SRN FROM student WHERE SRN = ?";
  db.query(checkStudentQuery, [SRN], (err, results) => {
    if (err) {
      console.error("Error checking student existence:", err);
      return res.status(500).json({ message: "Database error." });
    }

    if (results.length === 0) {
      return res.status(400).json({
        message: "SRN does not exist. Please register the student first.",
      });
    }

    const insertAchievementQuery = `
      INSERT INTO achievement (Name, Description, SRN)
      VALUES (?, ?, ?)
    `;
    db.query(insertAchievementQuery, [Name, Description, SRN], (err) => {
      if (err) {
        console.error("Error inserting achievement:", err);
        return res.status(500).json({ message: "Failed to add achievement." });
      }
      res.status(200).json({ message: "Achievement added successfully." });
    });
  });
});

// CREATE
app.post("/add_student", (req, res) => {
  const { SRN, Name, DOB, Mobile, Email } = req.body;

  if (!SRN || !Name || !DOB || !Mobile || !Email) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const query = `
    INSERT INTO student (SRN, Name, DOB, Mobile, Email)
    VALUES (?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      Name = VALUES(Name),
      DOB = VALUES(DOB),
      Mobile = VALUES(Mobile),
      Email = VALUES(Email);
  `;

  db.query(query, [SRN, Name, DOB, Mobile, Email], (err) => {
    if (err) {
      console.error("Error inserting student information:", err);
      return res
        .status(500)
        .json({ message: "Failed to add student information." });
    }
    res
      .status(200)
      .json({ message: "Student information added successfully." });
  });
});

// AGGREGATE QUERY
app.get("/student_count_by_degree", (req, res) => {
  const query = `
    SELECT ad.Degree, COUNT(s.SRN) AS StudentCount
    FROM student s
    INNER JOIN academic_details ad ON s.SRN = ad.SRN
    GROUP BY ad.Degree;
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching student count by degree:", err);
      return res.status(500).json({ message: "Error fetching data." });
    }
    res.status(200).json(results);
  });
});

// JOIN
app.get("/students_with_degrees", (req, res) => {
  const query = `
    SELECT s.Name, ad.Degree
    FROM student s
    INNER JOIN academic_details ad ON s.SRN = ad.SRN;
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching students with degrees:", err);
      return res.status(500).json({ message: "Error fetching data." });
    }
    res.status(200).json(results);
  });
});
// NESTED QUERY
app.get("/students_without_achievements", (req, res) => {
  const query = `
    SELECT Name
    FROM student
    WHERE SRN NOT IN (SELECT SRN FROM achievement)
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching students without achievements:", err);
      return res.status(500).json({ message: "Error fetching data." });
    }
    res.status(200).json(results);
  });
});
// Stored Procedure
app.get("/get_jobs/:srn", (req, res) => {
  const { srn } = req.params;
  const query = "CALL GetJobsForStudent(?)";
  db.query(query, [srn], (err, results) => {
    if (err) {
      console.error("Error fetching jobs for student:", err);
      return res.status(500).json({ message: "Error fetching jobs." });
    }
    res.status(200).json(results[0]);
  });
});
// TRIGGER(UPDATES)
app.get("/student_logs", (req, res) => {
  const query = "SELECT * FROM student_log ORDER BY Timestamp DESC";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching student logs:", err);
      return res.status(500).json({ message: "Database error." });
    }
    res.status(200).json(results);
  });
});

// Ensure uploads directory exists
const fs = require("fs");
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

// Start the server
app.listen(3000, () => console.log("Server running on http://localhost:3000"));
