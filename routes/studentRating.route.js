const StudentRatingController = require("../controllers/studentRating_controller");
const { isValidId, authJwt, objectId } = require("../middlewares");
const express = require("express");
const router = express.Router();   
 router.post(
        "api/v1/ratings",
        [authJwt.verifyToken],
        StudentRatingController.createStudentRating
    );
    router.post(
        "api/v1/ratings/:teacherId",
        [authJwt.verifyToken],
        StudentRatingController.getRatingByTeacherId
    );
    router.get(
        "api/v1/ratings/:id",
        [authJwt.verifyToken, objectId.validId],
        StudentRatingController.getStudentRating
    );
    router.get(
        "api/v1/rating/teachers/:teacherId",
        [authJwt.verifyToken],
        StudentRatingController.getRatingByTeacherId
    );

    router.get(
        "api/v1/admin/ratings/:id",
        [authJwt.isAdmin, objectId.validId],
        StudentRatingController.getStudentRating
    );
    // router.get(
    //   "api/v1/admin/ratings/{teacherId}",
    //   [authJwt.isAdmin],
    //   StudentRatingController.getRatingByTeacherId
    // );
    router.get(
        "api/v1/admin/ratings/:id",
        [authJwt.isAdmin, objectId.validId],
        StudentRatingController.delete
    );
    module.exports = router;