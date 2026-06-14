import "./studentdashboard.css";
import { useNavigate } from "react-router-dom";

function StudentDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("Logged in user:",user);
  console.log("User ID:",user._id);
  const navigate=useNavigate();

  return (
    <div className="dashboard">
      <div className="navbar">
        <h2>Student Management System</h2>
        <h3>{user?.name}</h3>
      </div>

      <div className="content">
        <h1>Welcome, {user?.name}</h1>

             <div
        className="card"
        onClick={() => navigate("/student/attendance")}
      >
        <h3>Attendance</h3>
        <p>View attendance records</p>
      </div>

      <div
        className="card"
        onClick={() => navigate("/student-marks")}
      >
        <h3>Marks</h3>
        <p>View academic marks</p>
      </div>

      <div
        className="card"
        onClick={() => navigate("/student-profile")}
      >
        <h3>Profile</h3>
        <p>Manage your profile</p>
      </div>

    </div>
    </div>
  );
}

export default StudentDashboard;