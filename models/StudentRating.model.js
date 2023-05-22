const mongoose = require("mongoose");
const studentRatingSchema = mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "student",
    },
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
    },
    rating: {
      type: Number,
      default: 0,
    },
    review: {
      type: String,

    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("StudentRating", studentRatingSchema);
