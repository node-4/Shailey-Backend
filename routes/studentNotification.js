const studentNotification = require("../controllers/studentNotification");
const { authJwt, objectId } = require("../middlewares");
const express = require("express");
const router = express.Router();
    router.post(
        "api/v1/studentnotifications",
        [authJwt.verifyToken],
        studentNotification.sendNotifications
    );
    router.get(
        "api/v1/studentnotifications",
        [authJwt.verifyToken],
        studentNotification.getAllNotifications
    );
    router.get(
        "api/v1/studentnotifications/:id",
        [authJwt.verifyToken, objectId.validId],
        studentNotification.getNotificationById
    );
    router.get(
        "api/v1/studentnotifications/{teacherId}",
        [authJwt.verifyToken, objectId.validId],
        studentNotification.getNotificationByTeacherId
    );

    router.get(
        "api/v1/admin/studentnotifications",
        [authJwt.isAdmin],
        studentNotification.getAllNotifications
    );
    router.get(
        "api/v1/admin/studentnotifications/:id",
        [authJwt.isAdmin, objectId.validId],
        studentNotification.getNotificationById
    );
module.exports = router;
