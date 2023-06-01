const reviewController = require("../controllers/review.controller");
const { isValidId, authJwt, objectId } = require("../middlewares");
const express = require("express");
const router = express.Router();   
 router.post(
        "api/v1/teachers/:teacherId/reviews",
        [authJwt.verifyToken],
        reviewController.createReview
    );
    router.post(
        "api/v1/students/:studentId/reviews",
        [authJwt.verifyToken],
        reviewController.createReview
    );
    router.put(
        "api/v1/reviews/:id",
        [authJwt.verifyToken],
        reviewController.updateReview
    );
    router.put(
        "api/v1/admin/reviews/:id",
        //[authJwt.isAdmin, objectId.validId],
        reviewController.updateReview
    );
    router.get("api/v1/reviews", reviewController.getAllReviews);
    router.get("api/v1/admin/reviews", reviewController.getAllReviews);
    router.delete(
        "api/v1/admin/reviews/:id",
        //[authJwt.isAdmin, objectId.validId],
        reviewController.deleteReviewById
    );
    router.get(
        "api/v1/reviews/:id",
        [objectId.validId],
        reviewController.getReviewById
    );

    router.get(
        "api/v1/admin/reviews/:id",
        [objectId.validId],
        reviewController.getReviewById
    );
    module.exports = router;

