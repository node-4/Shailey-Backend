const subscribedTeacherController = require("../controllers/subscribe_teacher_controller");
const { authJwt } = require("../middlewares");
module.exports = (app) => {
  app.get(
    "/api/v1/subscribes/teachers",
    [authJwt.verifyToken],
    subscribedTeacherController.findTeacher
  );
  app.post(
    "/api/v1/students/subscribes/teachers/:id",
    [authJwt.verifyToken],
    subscribedTeacherController.selectTeacher
  );
  app.get(
    "/api/v1/subscribes/teacher/:id",
    [authJwt.verifyToken],
    subscribedTeacherController.getSubscribedTeachersStudentList
  );
};
