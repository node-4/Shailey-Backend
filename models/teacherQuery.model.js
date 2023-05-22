const mongoose = require("mongoose");

const teacherQuerySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    teacherId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Teacher",
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TeacherQuery", teacherQuerySchema);
