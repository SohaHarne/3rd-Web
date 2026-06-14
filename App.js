import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/login";
import Register from "./pages/register";
import StudentDashboard from "./pages/studentdashboard";
import Students from "./pages/students";
import Attendance from "./pages/attendance";
import StudentMarks from "./pages/studentmarks";
import Marks from "./pages/marks";

import StudentAttendance from "./pages/studentattendance";
import StudentProfile from "./pages/studentprofile";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/students" element={<Students/>} />
        <Route path="/student-dashboard" element={<StudentDashboard/>} />
        <Route path="/attendance" element={<Attendance/>} />
        <Route path="/marks" element={<Marks/>} />
        <Route path="/student-marks" element={<StudentMarks/>} />
        <Route path="/student-profile" element={<StudentProfile/>}/>
        <Route path="/student/attendance" element={<StudentAttendance/>}/>
        
    

  
      </Routes>
    </BrowserRouter>
  );
}

export default App;