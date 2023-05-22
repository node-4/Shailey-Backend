const studentNotification = require("../controllers/studentNotification");
const { authJwt, objectId } = require("../middlewares");
module.exports = (app) => {
  app.post(
    "/api/v1/studentnotifications",
    [authJwt.verifyToken],
    studentNotification.sendNotifications
  );
  app.get(
    "/api/v1/studentnotifications",
    [authJwt.verifyToken],
    studentNotification.getAllNotifications
  );
  app.get(
    "/api/v1/studentnotifications/:id",
    [authJwt.verifyToken, objectId.validId],
    studentNotification.getNotificationById
  );
  app.get(
    "/api/v1/studentnotifications/{teacherId}",
    [authJwt.verifyToken, objectId.validId],
    studentNotification.getNotificationByTeacherId
  );

  app.get(
    "/api/v1/admin/studentnotifications",
    [authJwt.isAdmin],
    studentNotification.getAllNotifications
  );
  app.get(
    "/api/v1/admin/studentnotifications/:id",
    [authJwt.isAdmin, objectId.validId],
    studentNotification.getNotificationById
  );
};
