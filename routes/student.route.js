const studentController = require("../controllers/student_controller");
const { objectId, authJwt, validateBody } = require("../middlewares");
const express = require("express");
const router = express.Router();
router.post(
    "api/v1/students",
    [authJwt.verifyToken, validateBody.teacherBodies],
    studentController.createStudent
);
router.put(
    "api/v1/students/:id",
    [authJwt.verifyToken, objectId.validId],
    studentController.updateStudent
);
router.delete(
    "api/v1/students/:id",
    [authJwt.verifyToken],
    studentController.deleteStudent
);
router.get(
    "api/v1/students/:id",
    [authJwt.verifyToken],
    studentController.getStudentById
);
router.get(
    "api/v1/student/:userId",
    [authJwt.verifyToken],
    studentController.getStudentByUserId
);
router.get(
    "api/v1/students",
    [authJwt.verifyToken],
    studentController.getAllStudents
);

//admin
router.post(
    "api/v1/admin/students",
    [authJwt.isAdmin, validateBody.teacherBodies],
    studentController.createStudent
);
router.put(
    "api/v1/admin/students/:id",
    [authJwt.isAdmin, objectId.validId],
    studentController.updateStudent
);
router.delete(
    "api/v1/admin/students/:id",
    [authJwt.isAdmin, objectId.validId],
    studentController.deleteStudent
);
router.get(
    "api/v1/admin/students/:id",
    [authJwt.isAdmin, objectId.validId],
    studentController.getStudentById
);
router.get(
    "api/v1/admin/students",
    [authJwt.isAdmin],
    studentController.getAllStudents
);
module.exports = router;
