const TeacherModel = require("../models/teacher.model");
const StudentModel = require("../models/student.model");

exports.updateTeacherTopics = async (req, res) => {
  try {
    const { id } = req.params;

    const teacher = await TeacherModel.findById(id);
    if (!teacher) {
      return res.status(400).json({
        message: "Teacher not found",
      });
    }
    teacher.category = req.body.category ? req.body.category : teacher.category;
    teacher.subject = req.body.subject ? req.body.subject : teacher.subject;
    teacher.subjectStream = req.body.subjectStream
      ? req.body.subjectStream
      : teacher.subjectStream;
    const updatedTeacher = await teacher.save();

    return res.status(200).json({
      message: "Teacher updated successfully",
      data: updatedTeacher,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Server error",
    });
  }
};

exports.updateStudentTopics = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await StudentModel.findById(id);
    if (!student) {
      return res.status(400).json({
        message: "Student not found",
      });
    }
    student.category = req.body.category ? req.body.category : student.category;
    student.subject = req.body.subject ? req.body.subject : student.subject;
    student.subjectStream = req.body.subjectStream
      ? req.body.subjectStream
      : student.subjectStream;
    const updatedStudent = await student.save();
    res.status(200).json({
      message: "Student updated successfully",
      data: updatedStudent,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Server error",
    });
  }
};
