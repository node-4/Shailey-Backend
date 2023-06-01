const StudentRatingController = require("../controllers/studentRating_controller");
const { isValidId, authJwt, objectId } = require("../middlewares");
const express = require("express");
const router = express.Router();   
 router.post(
        "/ratings",
        [authJwt.verifyToken],
        StudentRatingController.createStudentRating
    );
    router.post(
        "/ratings/:teacherId",
        [authJwt.verifyToken],
        StudentRatingController.getRatingByTeacherId
    );
    router.get(
        "/ratings/:id",
        [authJwt.verifyToken, objectId.validId],
        StudentRatingController.getStudentRating
    );
    router.get(
        "/rating/teachers/:teacherId",
        [authJwt.verifyToken],
        StudentRatingController.getRatingByTeacherId
    );

    router.get(
        "/admin/ratings/:id",
        [authJwt.isAdmin, objectId.validId],
        StudentRatingController.getStudentRating
    );
    // router.get(
    //   "/admin/ratings/{teacherId}",
    //   [authJwt.isAdmin],
    //   StudentRatingController.getRatingByTeacherId
    // );
    router.get(
        "/admin/ratings/:id",
        [authJwt.isAdmin, objectId.validId],
        StudentRatingController.delete
    );
    module.exports = router;