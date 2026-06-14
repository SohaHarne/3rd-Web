import { useEffect, useState } from "react";
import axios from "axios";
import "./adminmarks.css";

function Marks() {
  const [marks, setMarks] = useState([]);
  const [students, setStudents] = useState([]);

  const [form, setForm] = useState({
    studentId: "",
    subject: "",
    marks: "",
    semester: "",
  });

  const fetchMarks = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/marks"
      );
      setMarks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchStudents = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/students"
      );
      setStudents(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMarks();
    fetchStudents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/marks",
        form
      );

      fetchMarks();

      setForm({
        studentId: "",
        subject: "",
        marks: "",
        semester: "",
      });

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="marks-container">
      <h2>Marks Management</h2>

      <form onSubmit={handleSubmit}>

        <select
          value={form.studentId}
          onChange={(e) =>
            setForm({
              ...form,
              studentId: e.target.value,
            })
          }
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
          placeholder="Subject"
          value={form.subject}
          onChange={(e) =>
            setForm({
              ...form,
              subject: e.target.value,
            })
          }
        />

        <input
          type="number"
          placeholder="Marks"
          value={form.marks}
          onChange={(e) =>
            setForm({
              ...form,
              marks: e.target.value,
            })
          }
        />

        <input
          type="number"
          placeholder="Semester"
          value={form.semester}
          onChange={(e) =>
            setForm({
              ...form,
              semester: e.target.value,
            })
          }
        />

        <button type="submit">
          Add Marks
        </button>

      </form>

      <table>
        <thead>
          <tr>
            <th>Student</th>
            <th>Subject</th>
            <th>Marks</th>
            <th>Semester</th>
          </tr>
        </thead>

        <tbody>
          {marks.map((m) => (
            <tr key={m._id}>
              <td>{m.studentId?.name}</td>
              <td>{m.subject}</td>
              <td>{m.marks}</td>
              <td>{m.semester}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Marks;