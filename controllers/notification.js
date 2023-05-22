const Notification = require("../models/nofication");
const Student = require("../models/student.model.js");
const Teacher = require("../models/teacher.model.js");

exports.sendNotifications = async (req, res) => {
  try {
    if (!req.body.message)
      return res.status(404).send({ msg: "please provide a message" });
    const data = {
      message: req.body.message,
    };
    // console.log(data);

    const notification = await Notification.create(data);

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

exports.update = async (req, res) => {
  try {
    const result = await Notification.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!result) return res.status(404).send({ msg: "update failed" });
    res.status(201).send({ message: "notification updated successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ msg: "internal server error", error: err });
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
