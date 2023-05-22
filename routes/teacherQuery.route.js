const teacherQueryController = require("../controllers/teacherQuery_controller");
const { objectId, authJwt } = require("../middlewares");
module.exports = (app) => {
    app.post(
        "/api/v1/queries",
        [authJwt.verifyToken],
        teacherQueryController.createTeacherQuery
    );
    app.get(
        "/api/v1/queries",
        [authJwt.verifyToken],
        teacherQueryController.getAllTeacherQuery
    );
    app.get(
        "/api/v1/admin/queries",
        [authJwt.isAdmin],
        teacherQueryController.getAllTeacherQuery
    );
    app.get(
        "/api/v1/queries/:id",
        [authJwt.verifyToken, objectId.validId],
        teacherQueryController.getTeacherQueryById
    );
    app.get(
        "/api/v1/admin/queries/:id",
        [authJwt.isAdmin, objectId.validId],
        teacherQueryController.getTeacherQueryById
    );
    app.put(
        "/api/v1/queries/:id",
        [authJwt.isAdmin, objectId.validId],
        teacherQueryController.updateTeacherQuery
    );
    app.delete(
        "/api/v1/queries/:id",
        [authJwt.verifyToken, objectId.validId],
        teacherQueryController.deleteTeacherQuery
    );
    app.delete(
        "/api/v1/admin/queries/:id",
        [authJwt.isAdmin, objectId.validId],
        teacherQueryController.deleteTeacherQuery
    );
};
