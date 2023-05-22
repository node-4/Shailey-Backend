const ReviewModel = require("../models/review.model");
const Teacher = require("../models/teacher.model");
const Student = require("../models/student.model");
exports.createReview = async (req, res) => {
  try {
    if (!req.body.description) {
      return res.status(400).send({ message: "enter review description" });
    }
    if (!req.body.ratingPoints) {
      return res.status(400).send({ message: "enter review rating points" });
    }

    const data = {
      description: req.body.description,
      ratingPoints: req.body.ratingPoints,
    };

    if (req.params.teacherId) {
      data.teacherId = req.params.teacherId;
      var teacher = await Teacher.findById(req.params.teacherId);
      if (!teacher) {
        return res.status(400).send({ message: "teacher not found" });
      }
    }

    if (req.params.studentId) {
      data.studentId = req.params.studentId;
      var student = await Student.findById(req.params.studentId);
      if (!student) {
        return res.status(400).send({ message: "student not found" });
      }
    }

    console.log(data);

    const review = await ReviewModel.create(data);
    
    // review.userName = teacher.firstName + " " + teacher.lastName;

    // const updatedReview = await review.save();
    console.log(`## review submitted ## `);
    console.log(` ${review} `);
    res.status(201).json({
      message: "review submitted successfully",
      data: review,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      error: err.message,
      msg: "internal server error",
    });
  }
};
exports.updateReview = async (req, res) => {
  try {
    const id = req.params.id;

    const { description, ratingPoints } = req.body;
    const updatedReview = await ReviewModel.findByIdAndUpdate(
      id,
      { description, ratingPoints },
      { new: true }
    );
    res.status(200).json({
      message: "review updated successfully",
      data: updatedReview,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: "error updating review",
    });
  }
};

exports.getAllReviews = async (req, res) => {
  try {
    const data = {};
    if (req.query.teacherId) {
      data.teacherId = req.query.teacherId;
    }
    if (req.query.studentId) {
      data.studentId = req.query.studentId;
    }
    const reviews = await ReviewModel.find(data).populate([
      "teacherId",
      "studentId",
    ]);

    if (!reviews || reviews.length === 0) {
      return res.status(200).json({ message: "no reviews found" });
    }

    res.status(200).json({
      message: "reviews found",
      data: reviews,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: "error getting reviews",
    });
  }
};

exports.deleteReviewById = async (req, res) => {
  try {
    const id = req.params.id;
    const review = await ReviewModel.findByIdAndDelete({ _id: id });
    res.status(200).json({
      message: "review deleted successfully",
      data: review,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: "error deleting review",
    });
  }
};

exports.getReviewById = async (req, res) => {
  try {
    const review = await ReviewModel.findById(req.params.id).populate([
      "teacherId",
      "studentId",
    ]);
    if (!review) {
      return res.status(404).json({ message: "not found" });
    }
    res.status(200).json({ data: review });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      err: err,
      msg: "internal server error",
    });
  }
};
