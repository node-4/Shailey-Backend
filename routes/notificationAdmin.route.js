const notificationController = require("../controllers/notification");
const { isValidId, authJwt, objectId } = require("../middlewares");
module.exports = (app) => {
  app.post(
    "/api/v1/admin/anotifications",
    [authJwt.isAdmin],
    notificationController.sendNotifications
  );
  app.get(
    "/api/v1/admin/anotifications",
    [authJwt.isAdmin],
    notificationController.getAllNotifications
  );
  app.get(
    "/api/v1/admin/anotifications/:id",
    [authJwt.isAdmin],
    notificationController.getNotificationById
  );
  app.delete(
    "/api/v1/admin/anotifications/:id",
    [authJwt.isAdmin],
    notificationController.deleteNotificationById
  );

  app.get(
    "/api/v1/anotifications",
    [authJwt.verifyToken],
    notificationController.getAllNotifications
  );
  app.get(
    "/api/v1//anotifications/:id",
    [authJwt.verifyToken, objectId.validId],
    notificationController.getNotificationById
  );
};
