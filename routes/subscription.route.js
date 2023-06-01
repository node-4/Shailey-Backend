const subscriptionController = require("../controllers/subscription.controller");
const { isValidId, authJwt } = require("../middlewares");
//console.log(authJwt);

const express = require("express");
const router = express.Router();
router.post(
        "/admin/subscriptions",
        [authJwt.isAdmin],
        subscriptionController.createSubscription
    );
    router.put(
        "/admin/subscriptions/:id",
        [authJwt.isAdmin, isValidId.subscriptionId],
        subscriptionController.updateSubscription
    );
    router.delete(
        "/admin/subscriptions/:id",
        [authJwt.isAdmin, isValidId.subscriptionId],
        subscriptionController.deleteSubscription
    );
    router.get(
        "/admin/subscriptions/:id",
        [authJwt.isAdmin, isValidId.subscriptionId],
        subscriptionController.getSubscriptionById
    );
    router.get(
        "/admin/subscriptions",
        [authJwt.isAdmin],
        subscriptionController.getAllSubscriptions
    );

    router.get(
        "/subscriptions/:id",
        [authJwt.verifyToken, isValidId.subscriptionId],
        subscriptionController.getSubscriptionById
    );
    router.get(
        "/subscriptions",
        [authJwt.verifyToken],
        subscriptionController.getAllSubscriptions
    );
    module.exports = router;
