const subscribedTeacherController = require("../controllers/subscribe_teacher_controller");
const { authJwt } = require("../middlewares");
const express = require("express");
const router = express.Router();
  router.get(
        "api/v1/subscribes/teachers",
        [authJwt.verifyToken],
        subscribedTeacherController.findTeacher
    );
    router.post(
        "api/v1/students/subscribes/teachers/:id",
        [authJwt.verifyToken],
        subscribedTeacherController.selectTeacher
    );
    router.get(
        "api/v1/subscribes/teacher/:id",
        [authJwt.verifyToken],
        subscribedTeacherController.getSubscribedTeachersStudentList
    );
    module.exports = router;
