const subscriptionController = require("../controllers/subscription.controller");
const { isValidId, authJwt } = require("../middlewares");
//console.log(authJwt);

const express = require("express");
const router = express.Router();
router.post(
        "api/v1/admin/subscriptions",
        [authJwt.isAdmin],
        subscriptionController.createSubscription
    );
    router.put(
        "api/v1/admin/subscriptions/:id",
        [authJwt.isAdmin, isValidId.subscriptionId],
        subscriptionController.updateSubscription
    );
    router.delete(
        "api/v1/admin/subscriptions/:id",
        [authJwt.isAdmin, isValidId.subscriptionId],
        subscriptionController.deleteSubscription
    );
    router.get(
        "api/v1/admin/subscriptions/:id",
        [authJwt.isAdmin, isValidId.subscriptionId],
        subscriptionController.getSubscriptionById
    );
    router.get(
        "api/v1/admin/subscriptions",
        [authJwt.isAdmin],
        subscriptionController.getAllSubscriptions
    );

    router.get(
        "api/v1/subscriptions/:id",
        [authJwt.verifyToken, isValidId.subscriptionId],
        subscriptionController.getSubscriptionById
    );
    router.get(
        "api/v1/subscriptions",
        [authJwt.verifyToken],
        subscriptionController.getAllSubscriptions
    );
    module.exports = router;
