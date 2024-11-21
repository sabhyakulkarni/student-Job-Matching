// AGGREGATE QUERY
import React, { useState, useEffect } from "react";

const StudentsWithDegrees = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/students_with_degrees")
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>Students with Degrees</h2>
      {students.length > 0 ? (
        students.map((student, index) => (
          <p key={index}>
            {student.Name} - {student.Degree}
          </p>
        ))
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
};

export default StudentsWithDegrees;
