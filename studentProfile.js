import express from "express";
import User from "../models/user.js";
import Student from "../models/Student.js";

const router = express.Router();

router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    const student = await Student.findOne({
      email: user.email,
    });

    res.json(student);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

export default router;