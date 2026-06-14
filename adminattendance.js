import express from "express";
import Attendance from "../models/Attendance.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const attendance =
      await Attendance.create(req.body);

    res.status(201).json(attendance);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const records = await Attendance.find()
      .populate("studentId");

    res.json(records);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Attendance.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Deleted",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

export default router;