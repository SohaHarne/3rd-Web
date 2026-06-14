import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import markRoutes from "./routes/adminmarks.js";
import authRoutes from "./routes/auth.js";
import studentRoutes from "./routes/routeStudent.js";
import attendanceRoutes from "./routes/adminattendance.js";
import studentAttendanceR from "./routes/studentAttendanceR.js";
import studentProfile from "./routes/studentProfile.js";


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is ready");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log("MongoDB Error:");
    console.log(err.message);
  });
  

app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);

app.use("/api/attendance",attendanceRoutes);
app.use("/api/marks",markRoutes);
app.use("/api/student-attendance",studentAttendanceR);
app.use("/api/student-profile", studentProfile);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});