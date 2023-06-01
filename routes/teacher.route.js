const teacherController = require("../controllers/teacher_registration");
const { authJwt, objectId, validateBody } = require("../middlewares");
const express = require("express");
const router = express.Router();
  router.post("/teachers",[authJwt.verifyToken, validateBody.teacherBodies],teacherController.createTeacher);
  router.put("/teachers/:id",[authJwt.verifyToken, objectId.validId],teacherController.updateTeacher);
  router.delete( "/teachers/:id", [authJwt.verifyToken, objectId.validId], teacherController.deleteTeacher);
  router.get( "/students/:id/teacher", [authJwt.verifyToken], teacherController.getAllTeachersWithInRange);
  router.get( "/teachers/:id/student", [authJwt.verifyToken], teacherController.getAllStudentsWithInRange);
  router.get( "/teachers/:id", [authJwt.verifyToken, objectId.validId], teacherController.getTeacherById);
  router.get( "/teachers/:id/teachersub", [authJwt.verifyToken, objectId.validId], teacherController.getTeacherSub);
  router.get( "/teacher/:userId", [authJwt.verifyToken], teacherController.getTeacherByUserId);
  // admin
  router.post( "/admin/teachers", [authJwt.isAdmin, validateBody.teacherBodies], teacherController.createTeacher);
  router.put( "/admin/teachers/:id", [authJwt.isAdmin, objectId.validId], teacherController.updateTeacher);
  router.delete( "/admin/teachers/:id", [authJwt.isAdmin, objectId.validId], teacherController.deleteTeacher);
  router.get( "/admin/teachers", [authJwt.isAdmin], teacherController.getAllTeachers);
  router.get( "/teachers", [authJwt.verifyToken], teacherController.getAllTeachers);
  router.get( "/admin/teachers/:id", [authJwt.isAdmin, objectId.validId], teacherController.getTeacherById);
  router.get( "/admin/teacher/:id", [authJwt.isAdmin, objectId.validId], teacherController.getTeacherByUserId);
  router.get( "/admin/teachersubscribed",  [authJwt.isAdmin], teacherController.getTotal);

module.exports = router;