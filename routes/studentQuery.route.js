const studentQueryController = require("../controllers/studentQuery_controller");
const { objectId, authJwt } = require("../middlewares");
const express = require("express");
const router = express.Router();
    router.post(
        "/studentqueries",
        [authJwt.verifyToken],
        studentQueryController.createStudentQuery
    );
    router.get(
        "/studentqueries/:id",
        [authJwt.verifyToken, objectId.validId],
        studentQueryController.getStudentQueryById
    );
    router.put(
        "/studentqueries/:id",
        [authJwt.verifyToken, objectId.validId],
        studentQueryController.updateStudentQuery
    );
    router.get(
        "/studentqueries",
        [authJwt.verifyToken],
        studentQueryController.getAllStudentQuery
    );
    //admin
    router.get(
        "/admin/studentqueries",
        [authJwt.isAdmin],
        studentQueryController.getAllStudentQuery
    );
    router.get(
        "/admin/studentqueries/:id",
        [authJwt.isAdmin, objectId.validId],
        studentQueryController.getStudentQueryById
    );
    router.delete(
        "/admin/studentqueries/:id",
        [authJwt.isAdmin, objectId.validId],
        studentQueryController.deleteStudentQuery
    );
    module.exports = router;
