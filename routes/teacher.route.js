const teacherController = require("../controllers/teacher_registration");
const { authJwt, objectId, validateBody } = require("../middlewares");
const express = require("express");
const router = express.Router();
  router.post("api/v1/teachers",[authJwt.verifyToken, validateBody.teacherBodies],teacherController.createTeacher);
  router.put("api/v1/teachers/:id",[authJwt.verifyToken, objectId.validId],teacherController.updateTeacher);
  router.delete( "api/v1/teachers/:id", [authJwt.verifyToken, objectId.validId], teacherController.deleteTeacher);
  router.get( "api/v1/students/:id/teacher", [authJwt.verifyToken], teacherController.getAllTeachersWithInRange);
  router.get( "api/v1/teachers/:id/student", [authJwt.verifyToken], teacherController.getAllStudentsWithInRange);
  router.get( "api/v1/teachers/:id", [authJwt.verifyToken, objectId.validId], teacherController.getTeacherById);
  router.get( "api/v1/teachers/:id/teachersub", [authJwt.verifyToken, objectId.validId], teacherController.getTeacherSub);
  router.get( "api/v1/teacher/:userId", [authJwt.verifyToken], teacherController.getTeacherByUserId);
  // admin
  router.post( "api/v1/admin/teachers", [authJwt.isAdmin, validateBody.teacherBodies], teacherController.createTeacher);
  router.put( "api/v1/admin/teachers/:id", [authJwt.isAdmin, objectId.validId], teacherController.updateTeacher);
  router.delete( "api/v1/admin/teachers/:id", [authJwt.isAdmin, objectId.validId], teacherController.deleteTeacher);
  router.get( "api/v1/admin/teachers", [authJwt.isAdmin], teacherController.getAllTeachers);
  router.get( "api/v1/teachers", [authJwt.verifyToken], teacherController.getAllTeachers);
  router.get( "api/v1/admin/teachers/:id", [authJwt.isAdmin, objectId.validId], teacherController.getTeacherById);
  router.get( "api/v1/admin/teacher/:id", [authJwt.isAdmin, objectId.validId], teacherController.getTeacherByUserId);
  router.get( "api/v1/admin/teachersubscribed",  [authJwt.isAdmin], teacherController.getTotal);

module.exports = router;