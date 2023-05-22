const teacherController = require("../controllers/teacher_registration");
const { authJwt, objectId, validateBody } = require("../middlewares");
module.exports = (app) => {
  app.post(
    "/api/v1/teachers",
    [authJwt.verifyToken, validateBody.teacherBodies],
    teacherController.createTeacher
  );
  app.put(
    "/api/v1/teachers/:id",
    [authJwt.verifyToken, objectId.validId],
    teacherController.updateTeacher
  );
  app.delete(
    "/api/v1/teachers/:id",
    [authJwt.verifyToken, objectId.validId],
    teacherController.deleteTeacher
  );
  app.get(
    "/api/v1/students/:id/teacher",
    [authJwt.verifyToken],
    teacherController.getAllTeachersWithInRange
  );
  app.get(
    "/api/v1/teachers/:id/student",
    [authJwt.verifyToken],
    teacherController.getAllStudentsWithInRange
  );
  app.get(
    "/api/v1/teachers/:id",
    [authJwt.verifyToken, objectId.validId],
    teacherController.getTeacherById
  );
  app.get(
    "/api/v1/teachers/:id/teachersub",
    [authJwt.verifyToken, objectId.validId],
    teacherController.getTeacherSub
  );
  app.get(
    "/api/v1/teacher/:userId",
    [authJwt.verifyToken],
    teacherController.getTeacherByUserId
  );
  // admin
  app.post(
    "/api/v1/admin/teachers",
    [authJwt.isAdmin, validateBody.teacherBodies],
    teacherController.createTeacher
  );
  app.put(
    "/api/v1/admin/teachers/:id",
    [authJwt.isAdmin, objectId.validId],
    teacherController.updateTeacher
  );
  app.delete(
    "/api/v1/admin/teachers/:id",

    [authJwt.isAdmin, objectId.validId],
    teacherController.deleteTeacher
  );
  app.get(
    "/api/v1/admin/teachers",
    [authJwt.isAdmin],
    teacherController.getAllTeachers
  );
  app.get(
    "/api/v1/teachers",
    [authJwt.verifyToken],
    teacherController.getAllTeachers
  );
  app.get(
    "/api/v1/admin/teachers/:id",
    [authJwt.isAdmin, objectId.validId],
    teacherController.getTeacherById
  );
  app.get(
    "/api/v1/admin/teacher/:id",
    [authJwt.isAdmin, objectId.validId],
    teacherController.getTeacherByUserId
  );
  app.get(
    "/api/v1/admin/teachersubscribed",
    //[authJwt.isAdmin],
    teacherController.getTotal
  );
};
