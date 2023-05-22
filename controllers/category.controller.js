const Category = require("../models/category.model");

exports.create = async (req, res) => {
  try {
    // Check for missing input
    if (!req.body.category) {
      return res.status(400).json({ error: "category is required" });
    }
    // Create new category object
    const newCategory = new Category({
      category: req.body.category,
    });
    // Save category to the database
    const category = await newCategory.save();
    res.status(201).json(category);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "internal server error ", error: err });
  }
};

exports.get = async (req, res) => {
  try {
    const categories = await Category.find();
    if (!categories || categories.length === 0) {
      console.log(" categories not found");
      return res.status(404).json({ msg: "no categories found" });
    }
    console.log("categories found", categories);

    res.status(201).json(categories);
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ msg: "internal server error", error: err });
  }
};

// Get a single category by id
exports.getId = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      console.log(" categories not found");
      return res.status(404).json({ error: "Category not found" });
    }
    res.status(201).json(category);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "internal server error ", error: err });
  }
};

// Update a category
exports.updateCategory = async (req, res) => {
  try {
    if (!req.body.category) {
      return res.status(400).json({ error: "category is required" });
    }
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!category) {
      console.log(" categories not found");
      return res.status(404).json({ error: "Category not found" });
    }
    console.log(`updated category ${category}`);
    res.status(201).json(category);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "internal server error ", error: err });
  }
};

// Delete a category
exports.delete = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      console.log(" categories not found");
      return res.status(404).json({ error: "Category not found" });
    }
    console.log("deleted category");
    res.status(201).json({ message: "Category deleted" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "internal server error ", error: err });
  }
};
