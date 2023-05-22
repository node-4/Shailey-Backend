const mongoose = require("mongoose");

const studentNotificationSchema = new mongoose.Schema(
  {
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "student",
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "StudentNotification",
  studentNotificationSchema
);
