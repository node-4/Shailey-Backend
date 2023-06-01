const teacherQueryController = require("../controllers/teacherQuery_controller");
const { objectId, authJwt } = require("../middlewares");
const express = require("express");
const router = express.Router();   
 router.post(
        "/queries",
        [authJwt.verifyToken],
        teacherQueryController.createTeacherQuery
    );
    router.get(
        "/queries",
        [authJwt.verifyToken],
        teacherQueryController.getAllTeacherQuery
    );
    router.get(
        "/admin/queries",
        [authJwt.isAdmin],
        teacherQueryController.getAllTeacherQuery
    );
    router.get(
        "/queries/:id",
        [authJwt.verifyToken, objectId.validId],
        teacherQueryController.getTeacherQueryById
    );
    router.get(
        "/admin/queries/:id",
        [authJwt.isAdmin, objectId.validId],
        teacherQueryController.getTeacherQueryById
    );
    router.put(
        "/queries/:id",
        [authJwt.isAdmin, objectId.validId],
        teacherQueryController.updateTeacherQuery
    );
    router.delete(
        "/queries/:id",
        [authJwt.verifyToken, objectId.validId],
        teacherQueryController.deleteTeacherQuery
    );
    router.delete(
        "/admin/queries/:id",
        [authJwt.isAdmin, objectId.validId],
        teacherQueryController.deleteTeacherQuery
    );
    module.exports = router;