// NESTED QUERY
import React, { useState, useEffect } from "react";

const StudentsWithoutAchievements = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/students_without_achievements")
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>Students Without Achievements</h2>
      {students.length > 0 ? (
        students.map((student, index) => <p key={index}>{student.Name}</p>)
      ) : (
        <p>All students have achievements.</p>
      )}
    </div>
  );
};

export default StudentsWithoutAchievements;
