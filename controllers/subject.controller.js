const Subject = require("../models/subject.model");
const Category = require("../models/category.model");
const SubjectStream = require("../models/subjectStream.model");

exports.create = async (req, res) => {
  try {
    // Check for missing input
    if (!req.body.subject) {
      return res.status(400).json({ error: "subject is required" });
    }

    if (!req.body.category) {
      return res.status(400).json({ error: "category is required" });
    }
    if (!req.body.subjectStream) {
      return res.status(400).send({ error: "subjectStream is required" });
    }
    const categoryExists = await Category.findOne({
      category: req.body.category,
    });
    console.log(categoryExists);
    if (!categoryExists) {
      console.log(` ${req.body.category} category is not available`);
      return res
        .status(404)
        .json({ error: `${req.body.category} is not available` });
    }

    const subjectStream = await SubjectStream.findOne({
      subjectStream: req.body.subjectStream,
    });
    if (!subjectStream) {
      console.log(` ${req.body.subjectStream} subcategory is not available`);
      return res
        .status(404)
        .send({ error: `${req.body.subjectStream} is not available` });
    }
    // Create new subject object
    const newSubject = new Subject({
      subject: req.body.subject,
      category: req.body.category,
      subjectStream: req.body.subjectStream,
    });
    // Save subject to the database
    const subject = await newSubject.save();
    res.status(201).json(subject);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "internal server error ", error: err });
  }
};

exports.get = async (req, res) => {
  try {
    const queryObj = {};
    if (req.query.subjectStream) {
      queryObj.subjectStream = req.query.subjectStream;
    }
    console.log(queryObj);
    const categories = await Subject.find(queryObj);
    if (!categories || categories.length === 0) {
      console.log(" subject not found");
      return res.status(404).json({ msg: "no categories found" });
    }
    console.log("subject found", categories);

    res.status(201).json(categories);
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ msg: "internal server error", error: err });
  }
};

// Get a single subject by id
exports.getId = async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);
    if (!subject) {
      console.log(" subject not found");
      return res.status(404).json({ error: "Subject not found" });
    }
    console.log("subject found", subject);
    res.status(201).json(subject);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "internal server error ", error: err });
  }
};

// Update a subject
exports.update = async (req, res) => {
  try {
    if (!req.body.subject) {
      return res.status(400).json({ error: "subject is required" });
    }

    const subject = await Subject.findByIdAndUpdate(
      req.params.id,
      {
        subject: req.body.subject,
        category: req.body.category,
        subjectStream: req.body.subjectStream,
      },
      {
        new: true,
      }
    );
    if (!subject) {
      console.log(" subject not found");
      return res.status(404).json({ error: "Subject not found" });
    }
    console.log(`updated subject ${subject}`);
    res.status(201).json(subject);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "internal server error ", error: err });
  }
};

// Delete a subject
exports.delete = async (req, res) => {
  try {
    const subject = await Subject.findByIdAndDelete(req.params.id);
    if (!subject) {
      console.log(" subject not found");
      return res.status(404).json({ error: "Subject not found" });
    }
    console.log("deleted subject");
    res.status(201).json({ message: "Subject deleted" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "internal server error ", error: err });
  }
};
