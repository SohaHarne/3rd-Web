import express from "express";
import Attendance from "../models/attendance.js";
import Student from "../models/Student.js";
import User from "../models/user.js";

const router = express.Router();

router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const student = await Student.findOne({
      email: user.email,
    });

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    const records = await Attendance.find({
      studentId: student._id,
    });

    res.json(records);

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: err.message,
    });
  }
});

export default router;