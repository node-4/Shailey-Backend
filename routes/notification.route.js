const notificationController = require("../controllers/notification.controller");
const { isValidId, authJwt } = require("../middlewares");
module.exports = (app) => {
  app.post(
    "/api/v1/notifications",
    [authJwt.isAdmin],
    notificationController.sendNotifications
  );
  app.get(
    "/api/v1/notifications",
    [authJwt.verifyToken],
    notificationController.getAllNotifications
  );
  app.get(
    "/api/v1/notifications/:id",
    [authJwt.verifyToken],
    notificationController.getNotificationById
  );
  app.delete(
    "/api/v1/notifications/:id",
    [authJwt.verifyToken],
    notificationController.deleteNotificationById
  );
};
