const topicController = require("../controllers/topic_controller");
const { authJwt, objectId } = require("../middlewares");
const express = require("express");
const router = express.Router();
    router.put(
        "/topics/:id",
        [authJwt.verifyToken, objectId.validId],
        topicController.updateTeacherTopics
    );
    router.put(
        "/stopics/:id",
        [authJwt.verifyToken, objectId.validId],
        topicController.updateStudentTopics
    );
    router.put(
        "/admin/topics/:id",
        [authJwt.isAdmin, objectId.validId],
        topicController.updateTeacherTopics
    );
    router.put(
        "/admin/stopics/:id",
        [authJwt.isAdmin, objectId.validId],
        topicController.updateStudentTopics
    );
    module.exports = router;
