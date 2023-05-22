const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const qualificationSchema = new Schema(
    {
        qualification: {
            type: String,
        },
    },
    { timestamps: true }
);
module.exports = mongoose.model("Qualification", qualificationSchema);
