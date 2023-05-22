const Notification = require("../models/notification.model.js");
const Student = require("../models/student.model.js");
const Teacher = require("../models/teacher.model.js");

exports.sendNotifications = async (req, res) => {
  try {
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

    const notification = await Notification.create(data);

    const teacher = await Teacher.findById(data.teacherId);
    console.log(teacher);

    teacher.notifications.push(notification);
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

exports.create = async (req, res) => {
  try {
    const data = {
      // teacherId: req.body.teacherId,
      // studentId: req.body.studentId,
      message: req.body.message,
    };
    console.log(data);

    // const student = await Student.findById(data.studentId);
    // if (!student) {
    //   return res.status(400).json({
    //     message: "Student not found",
    //   });
    // }

    const notification = await Notification.create(data);

    // const teacher = await Teacher.findById(data.teacherId);
    // console.log(teacher);

    // teacher.notifications.push(notification);
    // await teacher.save();

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
    const notifications = await Notification.find();
    if (!notifications || notifications.length === 0) {
      return res.status(400).json({
        message: "No notifications",
      });
    }
    return res.status(200).json({
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
    const notification = await Notification.findById(req.params.id);
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
    return res.status(200).json({
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
