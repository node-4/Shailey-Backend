const subscriptionController = require("../controllers/subscription.controller");
const { isValidId, authJwt } = require("../middlewares");
//console.log(authJwt);

module.exports = (app) => {
    app.post(
        "/api/v1/admin/subscriptions",
        [authJwt.isAdmin],
        subscriptionController.createSubscription
    );
    app.put(
        "/api/v1/admin/subscriptions/:id",
        [authJwt.isAdmin, isValidId.subscriptionId],
        subscriptionController.updateSubscription
    );
    app.delete(
        "/api/v1/admin/subscriptions/:id",
        [authJwt.isAdmin, isValidId.subscriptionId],
        subscriptionController.deleteSubscription
    );
    app.get(
        "/api/v1/admin/subscriptions/:id",
        [authJwt.isAdmin, isValidId.subscriptionId],
        subscriptionController.getSubscriptionById
    );
    app.get(
        "/api/v1/admin/subscriptions",
        [authJwt.isAdmin],
        subscriptionController.getAllSubscriptions
    );

    app.get(
        "/api/v1/subscriptions/:id",
        [authJwt.verifyToken, isValidId.subscriptionId],
        subscriptionController.getSubscriptionById
    );
    app.get(
        "/api/v1/subscriptions",
        [authJwt.verifyToken],
        subscriptionController.getAllSubscriptions
    );
};
