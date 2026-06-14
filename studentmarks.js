import { useEffect, useState } from "react";
import axios from "axios";
import "./marks.css";

function StudentMarks() {
  const [marks, setMarks] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchMarks();

  }, [fetchMarks])

  const fetchMarks = async () => {
  try {
    console.log("User:", user);
    console.log("Fetching marks for:", user._id);

    const res = await axios.get(
      `http://localhost:5000/api/marks/${user._id}`
    );

    console.log("Marks received:", res.data);

    setMarks(res.data);
  } catch (err) {
    console.log(err);
  }
  };
  return (
    <div className="marks-container">
      <div className="marks-card">
        <div className="marks-title">
      <h2>My Marks</h2>

      <table className="marks-table">
        <thead>
          <tr>
            <th>Subject</th>
            <th>Marks</th>
            <th>Semester</th>
          </tr>
        </thead>

        <tbody>
          {marks.map((mark) => (
            <tr key={mark._id}>
              <td>{mark.subject}</td>
              <td>{mark.marks}</td>
              <td>{mark.semester}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
    </div>
  );
}

export default StudentMarks;