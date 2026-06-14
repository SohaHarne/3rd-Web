import { useEffect, useState } from "react";
import axios from "axios";

function AttendancePage() {
  const [attendance, setAttendance] = useState([]);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/api/attendance/${user._id}`
      )
      .then((res) => setAttendance(res.data));
  }, []);

  return (
    <div>
      <h2>Attendance</h2>

      {attendance.map((item) => (
        <div key={item._id}>
          <h4>{item.subject}</h4>
          <p>
            {item.attendedClasses} /
            {item.totalClasses}
          </p>
        </div>
      ))}
    </div>
  );
}

export default AttendancePage;