const SubscriptionModel = require("../models/subscription.model");

exports.createSubscription = async (req, res) => {
  try {
    const { plan, price, image } = req.body;
    const subscription = await SubscriptionModel.create({
      plan,
      price,
      image,
    });
    res.status(201).json({
      message: "subscription plan have been created successfully",
      subscription,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "internal server error" });
  }
};
exports.getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await SubscriptionModel.find({});
    if (!subscriptions || subscriptions.length == 0) {
      return res.status(200).json({ message: "no subscription plans found" });
    }
    res.status(200).json({ message: "success", subscriptions });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: "internal server error in getting all subscription plans",
    });
  }
};

exports.getSubscriptionById = async (req, res) => {
  try {
    const { id } = req.params;
    const subscription = await SubscriptionModel.findById(id);
    if (!subscription) {
      return res.status(404).json({ message: "subscription not found" });
    }
    res.status(200).json({ message: "success", subscription });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "internal server error" });
  }
};

exports.updateSubscription = async (req, res) => {
  try {
    const { id } = req.params;

    const subscription = await SubscriptionModel.findByIdAndUpdate(
      id,
      { plan, price, image },
      { new: true }
    );
    if (!subscription) {
      return res.status(404).json({ message: "subscription plan not found" });
    }
    res.status(200).json({ message: "success", subscription });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "internal server error" });
  }
};

exports.deleteSubscription = async (req, res) => {
  try {
    const { id } = req.params;
    const subscription = await SubscriptionModel.findByIdAndDelete(id);
    if (!subscription) {
      return res.status(404).json({ message: "subscription plan not found" });
    }
    res.status(200).json({ message: "success", subscription });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "internal server error" });
  }
};
