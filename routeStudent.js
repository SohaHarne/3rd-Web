import express from "express";
import Student from "../models/Student.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const student = await Student.create(req.body);

    res.status(201).json(student);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const students = await Student.find();

    res.json(students);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    res.json(student);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(student);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);

    res.json({
      message: "Student deleted",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

export default router;