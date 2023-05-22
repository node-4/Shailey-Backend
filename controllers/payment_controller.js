const razorpay = require("razorpay");
const crypto = require("crypto");
const uuid = require("uuid");
const id = uuid.v4();
const Payment = require("../models/payment.model");
const Teacher = require("../models/teacher.model");
const Subscription = require("../models/subscription.model");
const Order = require("../models/order.model");
const instance = new razorpay({
    key_id: "rzp_live_xhEiJ4uMcMKT1r",
    key_secret: "JSwRiz3kcqggnJSTohP1pJPy",
});

exports.createPaymentOrder = async (req, res) => {
    const teacher = await Teacher.findOne({ _id: req.params.id });
    const subscription = await Subscription.findById(req.params.subscriptionId);
    if (!subscription) {
        return res.status(404).send({ msg: "Subscription not found" });
    }
    // const data = {
    //   amount: subscription.price * 100,
    //   currency: "INR",
    //   receipt: id,
    //   partial_payment: false,
    // };
    // console.log(data);
    try {
        // const result = await instance.orders.create(data);
        // console.log(result);
        const DBData = {
            userId: req.params.id,
            payment_Id: req.body.paymentId,
            amount: req.body.amount,
            amount_paid: req.body.amount_paid,
            orderId: req.body.orderId,
            // receipt: result.receipt,
            paymentMethod: req.body.paymentMethod,
            date: new Date(),
            subscription: subscription._id,
            paymentStatus: req.body.paymentStatus,
        };
        console.log(DBData);
        const AmountData = await Payment.create(DBData);
        // const date = new Date();
        // const months = subscription.plan.split();
        // teacher.subscriptionEndDate = date.setMonth(
        //     date.getMonth() + months[0]
        // );
        // teacher.subscribed = true;
        // await teacher.save();
        const order = await Order.findById(req.body.orderId);
        order.paymentStatus = "completed";
        res.status(200).json({
            details: AmountData,
        });
    } catch (err) {
        console.log(err);
        res.status(400).send({ message: err.message });
    }
};

exports.getAllPayments = async (req, res) => {
    try {
        const Data = await Payment.find();
        if (Data.length === 0) {
            console.log("#### not payment found ####");
            return res.status(404).send({ message: "not found" });
        }
        console.log(Data);
        res.status(200).json({ details: Data });
    } catch (err) {
        console.log(err);
        res.state(400).json({
            message: err.message,
        });
    }
};

exports.GetsById = async (req, res) => {
    try {
        const Data = await Payment.findById({ _id: req.params.id });
        if (!Data) {
            console.log("#### not payment found ####");
            return res
                .status(404)
                .send({ message: "no subscription payment found" });
        }
        console.log(Data);
        res.status(200).json({ details: Data });
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
};
