const StudentQueryModel = require("../models/studentQuery.model");
const Student = require("../models/student.model");

exports.createStudentQuery = async (req, res) => {
  try {
    console.log(req.user);
    const student = await Student.findOne({ userId: req.user._id });
    console.log(student);

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }
    const data = {
      name: student.firstName + " " + student.lastName,
      studentId: student._id,

      message: req.body.message,
    };

    const studentQuery = await StudentQueryModel.create(data);
    console.log(studentQuery);
    res.status(201).json({
      message: "query Submitted",
      data: studentQuery,
    });
  } catch (err) {
    res.status(500).json({
      message: "query submission failed!",
    });
  }
};

exports.getStudentQueryById = async (req, res) => {
  try {
    const studentQuery = await StudentQueryModel.findById(
      req.params.id
    ).populate("studentId");
    if (!studentQuery) {
      return res.status(404).json({
        message: "Student Query not found",
      });
    }
    res.status(200).json({
      message: "success !",
      data: studentQuery,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: "internal error",
    });
  }
};

exports.updateStudentQuery = async (req, res) => {
  try {
    const studentQuery = await StudentQueryModel.findById(req.params.id);
    if (!studentQuery) {
      return res.status(404).json({
        message: "Student Query not found",
      });
    }

    studentQuery.message = req.body.message
      ? req.body.message
      : studentQuery.message;
    await studentQuery.save();
    res.status(200).json({
      message: "updated successfully !",
    });
  } catch (err) {
    res.status(500).json({
      message: "updating query failed!",
    });
  }
};

exports.deleteStudentQuery = async (req, res) => {
  try {
    const studentQuery = await StudentQueryModel.findById(req.params.id);
    if (!studentQuery) {
      return res.status(404).json({
        message: "Student Query not found",
      });
    }
    await studentQuery.delete();
    res.status(200).json({
      message: "deleted successfully!",
    });
  } catch (err) {
    res.status(500).json({
      message: "internal error !",
    });
  }
};

exports.getAllStudentQuery = async (req, res) => {
  try {
    const studentQuery = await StudentQueryModel.find().populate("studentId");
    if (!studentQuery) {
      return res.status(404).json({
        message: "Student Query not found",
      });
    }
    res.status(200).json({
      message: "success !",
      data: studentQuery,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: "internal error",
    });
  }
};
