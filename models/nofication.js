const mongoose = require("mongoose");

const studentNotificationSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AdminNotification", studentNotificationSchema);
