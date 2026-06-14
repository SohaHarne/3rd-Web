import { useState } from "react";
import axios from "axios";
import "./auth.css";
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/login",
      formData
    );

    console.log("LOGIN RESPONSE:", res.data);
    console.log("ROLE:", res.data.user.role);

   localStorage.setItem("token", res.data.token);

localStorage.setItem(
  "user",
  JSON.stringify(res.data.user)
);

localStorage.setItem(
  "studentId",
  res.data.user._id
);

localStorage.setItem(
  "role",
  res.data.user.role
);

if (res.data.user.role === "admin") {
  navigate("/students");
} else {
  navigate("/student-dashboard");
}

}
   catch (err) {
  console.log(err.response?.data);
  console.log(err.response?.status);
  alert(
    err.response?.data?.message || "Login failed"
  );
  }};
  return (
    <div className="auth-container">
      <div className="auth-card">

      <form onSubmit={handleSubmit}>
        <h2>Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <button>Login</button>

<p>
  Don't have an account?{" "}
  <Link to="/register">Register</Link>
</p>

      </form>
      </div>

    </div>
  );
}

export default Login;