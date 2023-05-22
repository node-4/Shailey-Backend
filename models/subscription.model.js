const mongoose = require("mongoose");

const subscriptionSchema = mongoose.Schema(
  {
    image: {
      type: String,
    },
    plan: { type: String },
    price: {
      type: Number,
      unique: true,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subscription", subscriptionSchema);
