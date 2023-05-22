const studentRatingModel = require("../models/StudentRating.model");
const Teacher = require("../models/teacher.model");
const studentNotification = require("../routes/studentNotification");

exports.createStudentRating = async (req, res) => {
  try {
    const data = {
      teacherId: req.body.teacherId,
      studentId: req.body.studentId,
      rating: parseInt(req.body.rating),
      review: req.body.review
    }
    console.log(data);

    const ratings = await studentRatingModel.create(data);
    console.log(ratings);
    const teacher = await Teacher.findById(req.body.teacherId);
    console.log(teacher.review);
    teacher.review.push(ratings._id);
    const total = await studentRatingModel.find({ teacherId: req.body.teacherId });
    teacher.rating += (ratings.rating / total.length);
    const updated = await teacher.save();
    console.log(updated);
    return res.status(201).json({
      message: "Student rating successfully created",
      data: ratings,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: err,
    });
  }
};

exports.getRatingByTeacherId = async (req, res) => {
  try {
    const review = await studentRatingModel
      .find({
        teacherId: req.params.teacherId,
      })
      .populate(["teacherId", "studentId"]);
    if (review.length === 0) {
      return res.status(404).json({ msg: "review not found" });
    }
    res.status(200).json({ data: review });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: err, msg: "server error" });
  }
};

exports.getStudentRating = async (req, res) => {
  try {
    const result = await studentRatingModel
      .findById(req.params.id)
      .populate(["teacherId", "studentId"]);
    if (!result) {
      res.status(404).json({ msg: "not found" });
    }
    res.status(200).json({ data: result });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      msg: "server error",
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const result = await studentRatingModel.findById(req.params.id);
    if (!result) {
      return res.status(404).json({ msg: "not found" });
    }
    res.status(200).json({ data: result });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      msg: "server error",
      error: err,
    });
  }
};
