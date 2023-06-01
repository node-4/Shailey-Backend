const { application } = require("express");
const payment = require("../controllers/payment_controller");
const { authJwt } = require("../middlewares");

const express = require("express");
const router = express.Router();
    router.post(
        "api/v1/teachers/:id/subscriptions/:subscriptionId/payments",
        [authJwt.verifyToken],
        payment.createPaymentOrder
    );
    router.get("api/v1/payments", [authJwt.verifyToken], payment.getAllPayments);
    module.exports = router;
