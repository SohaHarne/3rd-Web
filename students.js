import { useEffect, useState } from "react";
import axios from "axios";
import "./students.css";
import { Link, useNavigate } from "react-router-dom";

function Students() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    rollNo: "",
    department: "",
    semester: "",
    email: "",
  });

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
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
    fetchStudents();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await axios.put(
          `http://localhost:5000/api/students/${editingId}`,
          formData
        );
      } else {
        await axios.post(
          "http://localhost:5000/api/students",
          formData
        );
      }

      setEditingId(null);

      setFormData({
        name: "",
        rollNo: "",
        department: "",
        semester: "",
        email: "",
      });

      fetchStudents();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteStudent = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/students/${id}`
      );

      fetchStudents();
    } catch (err) {
      console.log(err);
    }
  };

  const editStudent = (student) => {
    setEditingId(student._id);

    setFormData({
      name: student.name,
      rollNo: student.rollNo,
      department: student.department,
      semester: student.semester,
      email: student.email,
    });
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dashboard">
      <div className="table-section">
        

      <div className="navbar">
        <h2>Student Management</h2>

        <div className="nav-links">
          <Link to="/students">Students</Link>
          <Link to="/attendance">Attendance</Link>
          <Link to="/marks">Marks</Link>
          <button onClick={logout}>Logout</button>
        </div>

        <h3>{user?.name}</h3>
      </div>

      <div className="cards">
        <div className="card">
          <h2>{students.length}</h2>
          <p>Total Students</p>
        </div>
      </div>

      <div className="form-section">
        <form onSubmit={handleSubmit}>

          <input
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            name="rollNo"
            placeholder="Roll Number"
            value={formData.rollNo}
            onChange={handleChange}
          />

          <input
            name="department"
            placeholder="Department"
            value={formData.department}
            onChange={handleChange}
          />

          <input
            name="semester"
            placeholder="Semester"
            value={formData.semester}
            onChange={handleChange}
          />

          <input
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />

          <button type="submit">
            {editingId
              ? "Update Student"
              : "Add Student"}
          </button>

        </form>
      </div>

      <input
      className="search"
        className="search"
        placeholder="Search Student..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Roll</th>
            <th>Department</th>
            <th>Semester</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredStudents.map((student) => (
            <tr key={student._id}>
              <td>{student.name}</td>
              <td>{student.rollNo}</td>
              <td>{student.department}</td>
              <td>{student.semester}</td>
              <td>{student.email}</td>

              <td>
                <button
                  onClick={() => editStudent(student)}
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    deleteStudent(student._id)
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
    </div>
  );
}

export default Students;