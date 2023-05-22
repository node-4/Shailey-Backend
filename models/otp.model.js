const mongoose = require("mongoose");

const loginSchema = new mongoose.Schema(
    {
        phone: {
            type: String,
            required: true,
        },
        OTP: {
            type: Number,
        },
        role: {
            type: String,
            default: "user",
        },
    },
    { timestamps: true }
);
module.exports = mongoose.model("login", loginSchema);
