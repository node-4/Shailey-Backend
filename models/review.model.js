const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    teacherId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Teacher",
    },
    studentId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "student",
    },
    ratingPoints: {
      type: Number,
      max: 10,
      default: 0,
    },
    description: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
