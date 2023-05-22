const mongoose = require("mongoose");

const legalSchema = mongoose.Schema({
  legalInformation: {
    type: String,
  },
});

const terms = mongoose.model("LegalInformation", legalSchema);

module.exports = terms;
