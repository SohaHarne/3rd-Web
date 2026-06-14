import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./studentattendance.css";

function StudentAttendance() {
  const [attendance, setAttendance] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
const studentId = user?._id;

    console.log("Student ID:", studentId);

    if (!studentId) {
      console.log("No student ID found");
      return;
    }
    

    fetch(
      `http://localhost:5000/api/student-attendance/${studentId}`
    )
      .then((res) => res.json())
      .then((data) => {
  console.log("Attendance received:", data);
  console.log("Logged in user:", user);

  setAttendance(data);
})
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="attendance-container">
      <div className="attendance-card">
        <div className="attendance-title">
          
      <h2>My Attendance</h2>

      <table className="attendance-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {attendance.map((record) => (
            <tr key={record._id}>
              <td>{record.date}</td>
              <td>{record.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
  className="back-btn"
  onClick={() => navigate("/student-dashboard")}
>
  ← Back
</button>
    </div>
    </div>
    </div>
  );
}

export default StudentAttendance;