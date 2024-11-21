// TRIGGER
import React, { useEffect, useState } from "react";

function StudentLog() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/student_logs")
      .then((response) => response.json())
      .then((data) => setLogs(data))
      .catch((error) => console.error("Error fetching logs:", error));
  }, []);

  return (
    <div>
      <h2>Student Activity Logs</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Log ID</th>
            <th>SRN</th>
            <th>Action</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.Log_ID}>
              <td>{log.Log_ID}</td>
              <td>{log.SRN}</td>
              <td>{log.Action}</td>
              <td>{log.Timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentLog;
