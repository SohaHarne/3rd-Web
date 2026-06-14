import express from "express";
import Mark from "../models/Mark.js";
import Student from "../models/Student.js";
import User from "../models/user.js";

const router = express.Router();

// Add marks
router.post("/", async (req, res) => {
  try {
    const mark = await Mark.create(req.body);
    res.status(201).json(mark);
  } catch (err) {
  console.log(err);
  res.status(500).json({
    message: err.message,
  });
}
});

// Get all marks
router.get("/", async (req, res) => {
  try {
    const marks = await Mark.find().populate("studentId");
    res.json(marks);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get marks by student


router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    const student = await Student.findOne({
      email: user.email,
    });

    const marks = await Mark.find({
      studentId: student._id,
    });

    res.json(marks);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
// Update marks
router.put("/:id", async (req, res) => {
  try {
    const mark = await Mark.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(mark);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete marks
router.delete("/:id", async (req, res) => {
  try {
    await Mark.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;