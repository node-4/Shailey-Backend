const topicController = require("../controllers/topic_controller");
const { authJwt, objectId } = require("../middlewares");
const express = require("express");
const router = express.Router();
    router.put(
        "api/v1/topics/:id",
        [authJwt.verifyToken, objectId.validId],
        topicController.updateTeacherTopics
    );
    router.put(
        "api/v1/stopics/:id",
        [authJwt.verifyToken, objectId.validId],
        topicController.updateStudentTopics
    );
    router.put(
        "api/v1/admin/topics/:id",
        [authJwt.isAdmin, objectId.validId],
        topicController.updateTeacherTopics
    );
    router.put(
        "api/v1/admin/stopics/:id",
        [authJwt.isAdmin, objectId.validId],
        topicController.updateStudentTopics
    );
    module.exports = router;
