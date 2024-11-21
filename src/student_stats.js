// FRONT-END CODE TO SHOW TRIGGERS, QUERY ,
import React, { useState, useEffect } from "react";

const StudentStatistics = () => {
  const [triggerLogs, setTriggerLogs] = useState([]);
  const [studentsWithoutAchievements, setStudentsWithoutAchievements] =
    useState([]);
  const [studentsWithDegrees, setStudentsWithDegrees] = useState([]);
  const [studentCountByDegree, setStudentCountByDegree] = useState([]);

  useEffect(() => {
    // Fetch Trigger Logs
    fetch("http://localhost:3000/student_logs")
      .then((res) => res.json())
      .then((data) => setTriggerLogs(data))
      .catch((err) => console.error("Error fetching trigger logs:", err));

    // Fetch Students Without Achievements
    fetch("http://localhost:3000/students_without_achievements")
      .then((res) => res.json())
      .then((data) => setStudentsWithoutAchievements(data))
      .catch((err) =>
        console.error("Error fetching students without achievements:", err)
      );

    // Fetch Students With Degrees
    fetch("http://localhost:3000/students_with_degrees")
      .then((res) => res.json())
      .then((data) => setStudentsWithDegrees(data))
      .catch((err) =>
        console.error("Error fetching students with degrees:", err)
      );

    // Fetch Student Count by Degree
    fetch("http://localhost:3000/student_count_by_degree")
      .then((res) => res.json())
      .then((data) => setStudentCountByDegree(data))
      .catch((err) =>
        console.error("Error fetching student count by degree:", err)
      );
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Student Statistics</h1>

      {/* Trigger Logs */}
      <section>
        <h2>Trigger Logs</h2>
        {triggerLogs.length > 0 ? (
          <table border="1" style={{ width: "100%", textAlign: "left" }}>
            <thead>
              <tr>
                <th>Log ID</th>
                <th>SRN</th>
                <th>Action</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {triggerLogs.map((log, index) => (
                <tr key={index}>
                  <td>{log.Log_ID}</td>
                  <td>{log.SRN}</td>
                  <td>{log.Action}</td>
                  <td>{log.Timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No trigger logs available.</p>
        )}
      </section>

      {/* Students Without Achievements */}
      <section>
        <h2>Students Without Achievements</h2>
        {studentsWithoutAchievements.length > 0 ? (
          <ul>
            {studentsWithoutAchievements.map((student, index) => (
              <li key={index}>{student.Name}</li>
            ))}
          </ul>
        ) : (
          <p>All students have achievements.</p>
        )}
      </section>

      {/* Students With Degrees */}
      <section>
        <h2>Students With Degrees</h2>
        {studentsWithDegrees.length > 0 ? (
          <table border="1" style={{ width: "100%", textAlign: "left" }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Degree</th>
              </tr>
            </thead>
            <tbody>
              {studentsWithDegrees.map((student, index) => (
                <tr key={index}>
                  <td>{student.Name}</td>
                  <td>{student.Degree}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No data available.</p>
        )}
      </section>

      {/* Student Count by Degree */}
      <section>
        <h2>Student Count by Degree</h2>
        {studentCountByDegree.length > 0 ? (
          <table border="1" style={{ width: "100%", textAlign: "left" }}>
            <thead>
              <tr>
                <th>Degree</th>
                <th>Student Count</th>
              </tr>
            </thead>
            <tbody>
              {studentCountByDegree.map((item, index) => (
                <tr key={index}>
                  <td>{item.Degree}</td>
                  <td>{item.StudentCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No data available.</p>
        )}
      </section>
    </div>
  );
};

export default StudentStatistics;
