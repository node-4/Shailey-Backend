const orderController = require("../controllers/order_controller");
const { isValidId, authJwt, objectId } = require("../middlewares");
module.exports = (app) => {
  //app.post('api/v1/teachers/:id/subscriptions/:id/orders', orderController.createOrder);
  app.post(
    "/api/v1/orders",
    [authJwt.verifyToken],
    orderController.createOrder
  );

  app.delete(
    "/api/v1/orders/:id",
    [authJwt.verifyToken, objectId.validId],
    orderController.deleteOrder
  );
  app.put(
    "/api/v1/orders/:id",
    [authJwt.verifyToken, objectId.validId],
    orderController.updateOrder
  );
  app.get("/api/v1/orders", [authJwt.verifyToken], orderController.getOrders);
  app.get(
    "/api/v1/orders/:id",
    [authJwt.verifyToken, objectId.validId],
    orderController.getOrderById
  );
};
