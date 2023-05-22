const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const GovtIdSchema = new Schema(
    {
        govtId: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("GovtId", GovtIdSchema);
