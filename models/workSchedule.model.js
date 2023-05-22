const mongoose = require("mongoose");
const wsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
    date: {
      type: Date,
    },
    title: {
      type: String,
    },
    details: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("WorkSchedule", wsSchema);
