const studentQueryController = require("../controllers/studentQuery_controller");
const { objectId, authJwt } = require("../middlewares");
module.exports = (app) => {
  app.post(
    "/api/v1/studentqueries",
    [authJwt.verifyToken],
    studentQueryController.createStudentQuery
  );
  app.get(
    "/api/v1/studentqueries/:id",
    [authJwt.verifyToken, objectId.validId],
    studentQueryController.getStudentQueryById
  );
  app.put(
    "/api/v1/studentqueries/:id",
    [authJwt.verifyToken, objectId.validId],
    studentQueryController.updateStudentQuery
  );
  app.get(
    "/api/v1/studentqueries",
    [authJwt.verifyToken],
    studentQueryController.getAllStudentQuery
  );
  //admin
  app.get(
    "/api/v1/admin/studentqueries",
    [authJwt.isAdmin],
    studentQueryController.getAllStudentQuery
  );
  app.get(
    "/api/v1/admin/studentqueries/:id",
    [authJwt.isAdmin, objectId.validId],
    studentQueryController.getStudentQueryById
  );
  app.delete(
    "/api/v1/admin/studentqueries/:id",
    [authJwt.isAdmin, objectId.validId],
    studentQueryController.deleteStudentQuery
  );
};
