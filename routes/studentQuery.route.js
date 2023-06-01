const studentQueryController = require("../controllers/studentQuery_controller");
const { objectId, authJwt } = require("../middlewares");
const express = require("express");
const router = express.Router();
    router.post(
        "api/v1/studentqueries",
        [authJwt.verifyToken],
        studentQueryController.createStudentQuery
    );
    router.get(
        "api/v1/studentqueries/:id",
        [authJwt.verifyToken, objectId.validId],
        studentQueryController.getStudentQueryById
    );
    router.put(
        "api/v1/studentqueries/:id",
        [authJwt.verifyToken, objectId.validId],
        studentQueryController.updateStudentQuery
    );
    router.get(
        "api/v1/studentqueries",
        [authJwt.verifyToken],
        studentQueryController.getAllStudentQuery
    );
    //admin
    router.get(
        "api/v1/admin/studentqueries",
        [authJwt.isAdmin],
        studentQueryController.getAllStudentQuery
    );
    router.get(
        "api/v1/admin/studentqueries/:id",
        [authJwt.isAdmin, objectId.validId],
        studentQueryController.getStudentQueryById
    );
    router.delete(
        "api/v1/admin/studentqueries/:id",
        [authJwt.isAdmin, objectId.validId],
        studentQueryController.deleteStudentQuery
    );
    module.exports = router;
