const studentController = require("../controllers/student_controller");
const { objectId, authJwt, validateBody } = require("../middlewares");
const express = require("express");
const router = express.Router();
router.post(
    "/students",
    [authJwt.verifyToken, validateBody.teacherBodies],
    studentController.createStudent
);
router.put(
    "/students/:id",
    [authJwt.verifyToken, objectId.validId],
    studentController.updateStudent
);
router.delete(
    "/students/:id",
    [authJwt.verifyToken],
    studentController.deleteStudent
);
router.get(
    "/students/:id",
    [authJwt.verifyToken],
    studentController.getStudentById
);
router.get(
    "/student/:userId",
    [authJwt.verifyToken],
    studentController.getStudentByUserId
);
router.get(
    "/students",
    [authJwt.verifyToken],
    studentController.getAllStudents
);

//admin
router.post(
    "/admin/students",
    [authJwt.isAdmin, validateBody.teacherBodies],
    studentController.createStudent
);
router.put(
    "/admin/students/:id",
    [authJwt.isAdmin, objectId.validId],
    studentController.updateStudent
);
router.delete(
    "/admin/students/:id",
    [authJwt.isAdmin, objectId.validId],
    studentController.deleteStudent
);
router.get(
    "/admin/students/:id",
    [authJwt.isAdmin, objectId.validId],
    studentController.getStudentById
);
router.get(
    "/admin/students",
    [authJwt.isAdmin],
    studentController.getAllStudents
);
module.exports = router;
