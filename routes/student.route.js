const studentController = require("../controllers/student_controller");
const { objectId, authJwt, validateBody } = require("../middlewares");
module.exports = (app) => {
  app.post(
    "/api/v1/students",
    [authJwt.verifyToken, validateBody.teacherBodies],
    studentController.createStudent
  );
  app.put(
    "/api/v1/students/:id",
    [authJwt.verifyToken, objectId.validId],
    studentController.updateStudent
  );
  app.delete(
    "/api/v1/students/:id",
    [authJwt.verifyToken],
    studentController.deleteStudent
  );
  app.get(
    "/api/v1/students/:id",
    [authJwt.verifyToken],
    studentController.getStudentById
  );
  app.get(
    "/api/v1/student/:userId",
    [authJwt.verifyToken],
    studentController.getStudentByUserId
  );
  app.get(
    "/api/v1/students",
    [authJwt.verifyToken],
    studentController.getAllStudents
  );

  //admin
  app.post(
    "/api/v1/admin/students",
    [authJwt.isAdmin, validateBody.teacherBodies],
    studentController.createStudent
  );
  app.put(
    "/api/v1/admin/students/:id",
    [authJwt.isAdmin, objectId.validId],
    studentController.updateStudent
  );
  app.delete(
    "/api/v1/admin/students/:id",
    [authJwt.isAdmin, objectId.validId],
    studentController.deleteStudent
  );
  app.get(
    "/api/v1/admin/students/:id",
    [authJwt.isAdmin, objectId.validId],
    studentController.getStudentById
  );
  app.get(
    "/api/v1/admin/students",
    [authJwt.isAdmin],
    studentController.getAllStudents
  );
};
