const notificationController = require("../controllers/notification.controller");
const { isValidId, authJwt } = require("../middlewares");
const express = require("express");
const router = express.Router();
    router.post(
        "/notifications",
        [authJwt.isAdmin],
        notificationController.sendNotifications
    );
    router.get(
        "/notifications",
        [authJwt.verifyToken],
        notificationController.getAllNotifications
    );
    router.get(
        "/notifications/:id",
        [authJwt.verifyToken],
        notificationController.getNotificationById
    );
    router.delete(
        "/notifications/:id",
        [authJwt.verifyToken],
        notificationController.deleteNotificationById
    );
    module.exports = router;
