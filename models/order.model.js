const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    teacherId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Teacher",
    },
    subscriptionId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Subscription",
    },
    status: {
      type: String,
      default: "",
      default: "inProgress",
      enum: ["inProgress", "completed", "failed", "cancelled"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
