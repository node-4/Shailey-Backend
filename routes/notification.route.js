const notificationController = require("../controllers/notification.controller");
const { isValidId, authJwt } = require("../middlewares");
const express = require("express");
const router = express.Router();
    router.post(
        "api/v1/notifications",
        [authJwt.isAdmin],
        notificationController.sendNotifications
    );
    router.get(
        "api/v1/notifications",
        [authJwt.verifyToken],
        notificationController.getAllNotifications
    );
    router.get(
        "api/v1/notifications/:id",
        [authJwt.verifyToken],
        notificationController.getNotificationById
    );
    router.delete(
        "api/v1/notifications/:id",
        [authJwt.verifyToken],
        notificationController.deleteNotificationById
    );
    module.exports = router;
