const teacherQueryController = require("../controllers/teacherQuery_controller");
const { objectId, authJwt } = require("../middlewares");
const express = require("express");
const router = express.Router();   
 router.post(
        "api/v1/queries",
        [authJwt.verifyToken],
        teacherQueryController.createTeacherQuery
    );
    router.get(
        "api/v1/queries",
        [authJwt.verifyToken],
        teacherQueryController.getAllTeacherQuery
    );
    router.get(
        "api/v1/admin/queries",
        [authJwt.isAdmin],
        teacherQueryController.getAllTeacherQuery
    );
    router.get(
        "api/v1/queries/:id",
        [authJwt.verifyToken, objectId.validId],
        teacherQueryController.getTeacherQueryById
    );
    router.get(
        "api/v1/admin/queries/:id",
        [authJwt.isAdmin, objectId.validId],
        teacherQueryController.getTeacherQueryById
    );
    router.put(
        "api/v1/queries/:id",
        [authJwt.isAdmin, objectId.validId],
        teacherQueryController.updateTeacherQuery
    );
    router.delete(
        "api/v1/queries/:id",
        [authJwt.verifyToken, objectId.validId],
        teacherQueryController.deleteTeacherQuery
    );
    router.delete(
        "api/v1/admin/queries/:id",
        [authJwt.isAdmin, objectId.validId],
        teacherQueryController.deleteTeacherQuery
    );
    module.exports = router;