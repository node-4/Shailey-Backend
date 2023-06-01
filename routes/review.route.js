const reviewController = require("../controllers/review.controller");
const { isValidId, authJwt, objectId } = require("../middlewares");
const express = require("express");
const router = express.Router();   
 router.post(
        "/teachers/:teacherId/reviews",
        [authJwt.verifyToken],
        reviewController.createReview
    );
    router.post(
        "/students/:studentId/reviews",
        [authJwt.verifyToken],
        reviewController.createReview
    );
    router.put(
        "/reviews/:id",
        [authJwt.verifyToken],
        reviewController.updateReview
    );
    router.put(
        "/admin/reviews/:id",
        //[authJwt.isAdmin, objectId.validId],
        reviewController.updateReview
    );
    router.get("/reviews", reviewController.getAllReviews);
    router.get("/admin/reviews", reviewController.getAllReviews);
    router.delete(
        "/admin/reviews/:id",
        //[authJwt.isAdmin, objectId.validId],
        reviewController.deleteReviewById
    );
    router.get(
        "/reviews/:id",
        [objectId.validId],
        reviewController.getReviewById
    );

    router.get(
        "/admin/reviews/:id",
        [objectId.validId],
        reviewController.getReviewById
    );
    module.exports = router;

