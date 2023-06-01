const orderController = require("../controllers/order_controller");
const { isValidId, authJwt, objectId } = require("../middlewares");
const express = require("express");
const router = express.Router();
//router.post('/teachers/:id/subscriptions/:id/orders', orderController.createOrder);
  router.post("/orders",[authJwt.verifyToken],orderController.createOrder);
  router.delete("/orders/:id",[authJwt.verifyToken, objectId.validId],orderController.deleteOrder);
  router.put("/orders/:id",[authJwt.verifyToken, objectId.validId],orderController.updateOrder);
  router.get("/orders", [authJwt.verifyToken], orderController.getOrders);
  router.get("/orders/:id",[authJwt.verifyToken, objectId.validId],orderController.getOrderById);
  module.exports = router;

