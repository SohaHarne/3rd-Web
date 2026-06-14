import { useEffect, useState } from "react";
import axios from "axios";
import "./studentprofile.css";
import { useNavigate } from "react-router-dom";

function StudentProfile() {
    const navigate=useNavigate();
  const [student, setStudent] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/student-profile/${user._id}`
      );

      setStudent(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!student) return <h2>Loading...</h2>;

  return (
  <div className="profile-container">
    <h2>My Profile</h2>

    <div className="profile-card">
      <div className="profile-item">
        <strong>Name</strong>
        <span>{student.name}</span>
      </div>

      <div className="profile-item">
        <strong>Email</strong>
        <span>{student.email}</span>
      </div>

      <div className="profile-item">
        <strong>Roll Number</strong>
        <span>{student.rollNo}</span>
      </div>

      <div className="profile-item">
        <strong>Department</strong>
        <span>{student.department}</span>
      </div>

      <div className="profile-item">
        <strong>Semester</strong>
        <span>{student.semester}</span>
      </div>
    </div>

    <button
      className="back-btn"
      onClick={() => navigate("/student-dashboard")}
    >
      Back to Dashboard
    </button>
  </div>
);};
export default StudentProfile;