const studentNotification = require("../controllers/studentNotification");
const { authJwt, objectId } = require("../middlewares");
const express = require("express");
const router = express.Router();
    router.post(
        "/studentnotifications",
        [authJwt.verifyToken],
        studentNotification.sendNotifications
    );
    router.get(
        "/studentnotifications",
        [authJwt.verifyToken],
        studentNotification.getAllNotifications
    );
    router.get(
        "/studentnotifications/:id",
        [authJwt.verifyToken, objectId.validId],
        studentNotification.getNotificationById
    );
    router.get(
        "/studentnotifications/{teacherId}",
        [authJwt.verifyToken, objectId.validId],
        studentNotification.getNotificationByTeacherId
    );

    router.get(
        "/admin/studentnotifications",
        [authJwt.isAdmin],
        studentNotification.getAllNotifications
    );
    router.get(
        "/admin/studentnotifications/:id",
        [authJwt.isAdmin, objectId.validId],
        studentNotification.getNotificationById
    );
module.exports = router;
