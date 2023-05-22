const SubjectStream = require("../models/subjectStream.model");
const Category = require("../models/category.model");
exports.create = async (req, res) => {
  try {
    // Check for missing input
    if (!req.body.category) {
      return res.status(400).json({ error: "category is required" });
    }
    if (!req.body.subjectStream) {
      return res.status(400).json({ error: " subjectStream is required" });
    }
    const categoryExists = await Category.findOne({
      category: req.body.category,
    });
    console.log(categoryExists);
    if (!categoryExists) {
      return res
        .status(400)
        .json({ error: `${req.body.category} is not available` });
    }
    const data = {
      category: req.body.category,
      subjectStream: req.body.subjectStream,
    };

    // Create new subjectStream object

    const subjectStream = await SubjectStream.create(data);
    res.status(201).json(subjectStream);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "internal server error ", error: err });
  }
};

exports.get = async (req, res) => {
  try {
    const queryObj = {};
    if (req.query.category) {
      queryObj.category = req.query.category;
      const categoryExists = await Category.findOne({
        category: req.query.category,
      });
      if (!categoryExists) {
        return res
          .status(400)
          .json({ error: `${req.query.category} is not available` });
      }
    }

    // if (req.query.category) {
    //   queryObj.category = req.query.category;
    // }
    const categories = await SubjectStream.find(queryObj);
    if (!categories || categories.length === 0) {
      console.log(" categories not found");
      return res.status(404).json({ msg: "no categories found" });
    }
    console.log("categories found", categories);

    res.status(201).json({ data: categories });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ msg: "internal server error", error: err });
  }
};

// Get a single subjectStream by id
exports.getId = async (req, res) => {
  try {
    const subjectStream = await SubjectStream.findById(req.params.id);
    if (!subjectStream) {
      console.log(" categories not found");
      return res.status(404).json({ error: "SubjectStream not found" });
    }
    console.log(` subjectStream found \n ${subjectStream}`);
    res.status(201).json({ data: subjectStream });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ msg: "internal server error", error: err });
  }
};

// Update a subjectStream
exports.update = async (req, res) => {
  try {
    if (!req.body.subjectStream) {
      return res.status(400).json({ error: "subjectStream is required" });
    }
    const categoryExists = await Category.findOne({
      category: req.body.category,
    });
    if (!categoryExists || categoryExists.length == 0) {
      console.log(` ${req.body.category} category is not available`);
      return res
        .status(400)
        .json({ error: `${req.body.category} is not available` });
    }
    const subjectStream = await SubjectStream.findByIdAndUpdate(
      req.params.id,
      {
        subjectStream: req.body.subjectStream,
        category: req.params.category,
      },
      {
        new: true,
      }
    );
    if (!subjectStream) {
      console.log(" categories not found");
      return res.status(404).json({ error: "SubjectStream not found" });
    }
    console.log(`updated subjectStream ${subjectStream}`);
    res.status(201).json(subjectStream);
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ msg: "internal server error", error: err });
  }
};

// Delete a subjectStream
exports.delete = async (req, res) => {
  try {
    const subjectStream = await SubjectStream.findByIdAndDelete(req.params.id);
    if (!subjectStream) {
      console.log(" categories not found");
      return res.status(404).json({ error: "SubjectStream not found" });
    }

    console.log(`deleted subjectStream ${subjectStream}`);
    res.status(201).json({ message: "SubjectStream deleted" });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ msg: "internal server error", error: err });
  }
};
