const { application } = require("express");
const payment = require("../controllers/payment_controller");
const { authJwt } = require("../middlewares");

module.exports = (app) => {
    app.post(
        "/api/v1/teachers/:id/subscriptions/:subscriptionId/payments",
        [authJwt.verifyToken],
        payment.createPaymentOrder
    );
    app.get("/api/v1/payments", [authJwt.verifyToken], payment.getAllPayments);
};
