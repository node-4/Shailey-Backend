const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    category: {
      type: String,
    },
    subjectStream: {
      type: String,
    },
    subject: {
      type: [String],
    },
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subject", schema);
