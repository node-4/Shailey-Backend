const mongoose = require("mongoose");

const studentQuerySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
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

module.exports = mongoose.model("StudentQuery", studentQuerySchema);
