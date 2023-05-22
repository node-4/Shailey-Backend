const aboutUsModel = require("../models/aboutUs.model");

exports.create = async (req, res) => {
  try {
    if (!content) {
      return res.status(400).send({
        message: "Content is required",
      });
    }
    const data = {
      content: req.body.content,
    };

    const result = await aboutUsModel.create(data);
    res.status(201).json({
      message: "about us created",
      data: result,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: "internal server error",
    });
  }
};

exports.getAboutUs = async (req, res) => {
  try {
    const result = await aboutUsModel.findById(req.params.id);
    res.status(200).json({
      message: "about us get",
      data: result,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: "internal server error",
    });
  }
};
exports.getAll = async (req, res) => {
  try {
    const result = await aboutUsModel.find();
    res.status(200).json({
      message: "about us get",
      data: result,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: "internal server error",
    });
  }
};

exports.updateAboutUs = async (req, res) => {
  try {
    const result = await aboutUsModel.findById(req.params.id);
    result.content = req.body.content ? req.body.content : result.content;

    await result.save();
    res.status(200).json({
      message: "about us updated",
      data: result,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: "internal server error",
    });
  }
};
