const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        require: true,
    },
    payment_Id: {
        type: String,
    },
    amount: {
        type: Number,
        required: true,
    },

    receipt: {
        type: String,
    },
    amount_paid: {
        type: Number,
        default: 0,
    },

    date: {
        type: Date,
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
    },
    paymentMethod: {
        type: String,
    },
    subscription: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Subscription",
    },
    paymentStatus: {
        type: String,
        default: "failed",
        enum: ["failed", "success", "completed"],
    },
});

const payment = mongoose.model("payment", paymentSchema);

module.exports = payment;
