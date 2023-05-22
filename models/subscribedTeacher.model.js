const mongoose = require("mongoose");

const subscribeTeacherSchema = new mongoose.Schema(
  {
    teacherId: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Teacher",
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("subscribeTeacher", subscribeTeacherSchema);
