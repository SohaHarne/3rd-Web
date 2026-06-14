import mongoose from "mongoose";

const markSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  subject: String,
  marks: Number,
  semester: Number,
});

const Mark =
  mongoose.models.Mark ||
  mongoose.model("Mark", markSchema);

export default Mark;