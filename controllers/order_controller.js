const OrderModel = require("../models/order.model");

const Teacher = require("../models/teacher.model");
const Subscription = require("../models/subscription.model");

exports.createOrder = async (req, res) => {
  try {
    const data = {
      userId: req.user._id,
      teacherId: req.body.teacherId,
      subscriptionId: req.body.subscriptionId,
    };

    const teacher = await Teacher.findOne({ _id: data.teacherId });

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    const subscription = await Subscription.findById(data.subscriptionId);
    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    // console.log(data);

    const order = await OrderModel.create(data);
    res.status(201).json({
      message: "order created",
      data: order,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      error: true,
      message: "order creation failed",
    });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find().populate([
      "teacherId",
      "subscriptionId",
    ]);
    res.status(200).json({
      orders,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      error: true,
      message: "order retrieval failed",
    });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await OrderModel.findById(id).populate([
      "teacherId",
      "subscriptionId",
    ]);
    res.status(200).json({
      order,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      error: true,
      message: "order retrieval failed",
    });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { teacherId, subscriptionId } = req.body;

    const order = await OrderModel.findByIdAndUpdate(id, {
      teacherId,
      subscriptionId,
    });
    res.status(200).json({
      message: " orderUpdated success ",
      order,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      error: true,
      message: "order update failed",
    });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await OrderModel.findByIdAndDelete(id);
    res.status(200).json({
      message: " order deleted ",
      order,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      error: true,
      message: "order deletion failed",
    });
  }
};
