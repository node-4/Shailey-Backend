const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    category: {
      type: String,
    },
    subjectStream: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SubjectStream", schema);
