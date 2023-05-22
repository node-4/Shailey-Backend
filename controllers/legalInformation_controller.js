const LegalInformationModel = require("../models/legalInformation.model");

exports.createLegalInformation = async (req, res) => {
  try {
    const data = {
      legalInformation: req.body.legalInformation,
    };
    const legalInfo = await LegalInformationModel.create(data);
    res.status(201).json({
      message: "legal information created",
      data: legalInfo,
    });
  } catch (error) {
    return res.status(400).json({
      message: "legal information not created",
    });
  }
};
exports.getLegalInformationById = async (req, res) => {
  try {
    const legalInfo = await LegalInformationModel.find({ id: req.params.id });
    if (!legalInfo) {
      return res.status(403).json({
        message: "legal information not found",
      });
    }
    res.status(200).json({
      message: "legal information found",
      data: legalInfo,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      message: "error while getting legal information",
    });
  }
};
exports.getAllLegalInformation = async (req, res) => {
  try {
    const legalInfo = await LegalInformationModel.find();
    if (legalInfo.length === 0) {
      return res.status(403).json({
        message: "legal information not found",
      });
    }
    res.status(200).json({
      message: "legal information found",
      data: legalInfo,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      message: "error while getting legal information",
    });
  }
};

exports.updateLegalInformation = async (req, res) => {
  try {
    const { LegalInformation } = req.body;
    const legalInfo = await LegalInformationModel.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    ).exec();
    console.log(legalInfo.legalInformation);
    res.status(200).json({
      message: "legal information updated",
      data: legalInfo,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({
      message: "error while updating legal information",
    });
  }
};
exports.deleteLegalInformation = async (req, res) => {
  try {
    const { id } = req.body;
    const legalInfo = await LegalInformationModel.findOneAndDelete({ _id: id });
    return res.status(200).json({
      message: "legal information deleted",
      data: legalInfo,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({
      message: "legal information not deleted",
    });
  }
};
