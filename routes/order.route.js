const orderController = require("../controllers/order_controller");
const { isValidId, authJwt, objectId } = require("../middlewares");
const express = require("express");
const router = express.Router();
//router.post('api/v1/teachers/:id/subscriptions/:id/orders', orderController.createOrder);
  router.post("api/v1/orders",[authJwt.verifyToken],orderController.createOrder);
  router.delete("api/v1/orders/:id",[authJwt.verifyToken, objectId.validId],orderController.deleteOrder);
  router.put("api/v1/orders/:id",[authJwt.verifyToken, objectId.validId],orderController.updateOrder);
  router.get("api/v1/orders", [authJwt.verifyToken], orderController.getOrders);
  router.get("api/v1/orders/:id",[authJwt.verifyToken, objectId.validId],orderController.getOrderById);
  module.exports = router;

