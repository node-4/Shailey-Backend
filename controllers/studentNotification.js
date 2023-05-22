const Notification = require("../models/studentNotifications.model");
const Student = require("../models/student.model.js");
const Teacher = require("../models/teacher.model.js");
const { response } = require("express");

exports.sendNotifications = async (req, res) => {
  try {
    if (!req.body.message)
      return res.status(404).send({ msg: "please provide a message" });
    const data = {
      teacherId: req.body.teacherId,
      studentId: req.body.studentId,
      message: req.body.message,
    };
    console.log(data);

    const student = await Student.findById(data.studentId);
    if (!student) {
      return res.status(400).json({
        message: "Student not found",
      });
    }
    const teacher = await Teacher.findById(data.teacherId);
    if (!teacher) {
      return res.status(400).json({
        message: "Teacher not found",
      });
    }

    console.log(teacher);

    const notification = await Notification.create(data);

    teacher.studentNotifications.push(notification._id);
    await teacher.save();

    return res.status(201).json({
      message: "notification sent successfully",
      data: notification,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({
      message: "internal server error",
    });
  }
};

exports.getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().populate([
      "teacherId",
      "studentId",
    ]);
    if (!notifications || notifications.length === 0) {
      return res.status(400).json({
        message: "No notifications",
      });
    }
    res.status(200).json({
      message: "notifications found",
      data: notifications,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      message: "internal server error",
    });
  }
};
exports.getNotificationById = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id).populate([
      "teacherId",
      "studentId",
    ]);
    if (!notification) {
      return res.status(400).json({
        message: "Notification not found",
      });
    }
    return res.status(200).json({
      message: "notification found",
      data: notification,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: "internal server error",
    });
  }
};

exports.deleteNotificationById = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndDelete(req.params.id);
    if (!notification) {
      return res.status(400).json({
        message: "Notification not found",
      });
    }
    res.status(200).json({
      message: "notification deleted",
      data: notification,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: "internal server error",
    });
  }
};

exports.getNotificationByTeacherId = async (req, res) => {
  try {
    const notification = await Notification.find({
      teacherId: req.params.teacherId,
    }).populate(["teacherId", "studentId"]);
    if (!notification || notification.length === 0) {
      return res.status(400).json({
        msg: "no notification found",
      });
    }
  } catch (err) {
    console.log(err.message);
    response.status(500).json({
      msg: "internal server error",
      error: err,
    });
  }
};
