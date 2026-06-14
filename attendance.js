import { useState,
         useEffect } from "react";

import axios from "axios";

import "./attendance.css";

function Attendance() {

  const [students, setStudents] =
    useState([]);

    

  const [records, setRecords] =
    useState([]);

  const [formData, setFormData] =
    useState({
      studentId: "",
      date: "",
      status: "Present",
    });

  const fetchStudents =
    async () => {

      const res =
        await axios.get(
          "http://localhost:5000/api/students"
        );

      setStudents(res.data);
    };

  const fetchAttendance =
    async () => {

      const res =
        await axios.get(
          "http://localhost:5000/api/attendance"
        );

      setRecords(res.data);
    };

  useEffect(() => {
    fetchStudents();
    fetchAttendance();
  }, []);

  const handleChange =
    (e) => {

      setFormData({
        ...formData,
        [e.target.name]:
          e.target.value,
      });
    };

  const handleSubmit =
    async (e) => {

      e.preventDefault();
      console.log("Sending attendance:",formData);

      await axios.post(
        "http://localhost:5000/api/attendance",
        formData
      );

      setFormData({
        studentId: "",
        date: "",
        status: "Present",
      });

      fetchAttendance();
    };

  const deleteRecord =
    async (id) => {

      await axios.delete(
        `http://localhost:5000/api/attendance/${id}`
      );

      fetchAttendance();
    };

  return (
    <div className="attendance-page">

      <h2>
        Attendance Management
      </h2>

      <form onSubmit={handleSubmit}>

        <select
          name="studentId"
          value={formData.studentId}
          onChange={handleChange}
        >
          <option value="">
            Select Student
          </option>

          {students.map((student) => (
            <option
              key={student._id}
              value={student._id}
            >
              {student.name}
            </option>
          ))}

        </select>
        <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}/>

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option>
            Present
          </option>

          <option>
            Absent
          </option>
        </select>

        <button>
          Mark Attendance
        </button>

      </form>

      <table>

        <thead>

          <tr>
            <th>Student</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>

        </thead>

        <tbody>

          {records.map((record) => (

            <tr key={record._id}>

              <td>
                {
                  record.studentId?.name
                }
              </td>

              <td>
                {record.date}
              </td>

              <td>
                {record.status}
              </td>

              <td>

                <button
                  onClick={() =>
                    deleteRecord(
                      record._id
                    )
                  }
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default Attendance;