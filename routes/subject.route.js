const subject = require("../controllers/subject.controller");
const { authJwt, objectId } = require("../middlewares");
const express = require("express");
const router = express.Router(); 
   router.post("/admin/subjects", [authJwt.isAdmin], subject.create);
    router.get("/admin/subjects", [authJwt.isAdmin], subject.get);
    router.get(
        "/admin/subjects/:id",
        [authJwt.isAdmin, objectId.validId],
        subject.getId
    );
    router.put(
        "/admin/subjects/:id",
        [authJwt.isAdmin, objectId.validId],
        subject.update
    );
    router.delete(
        "/admin/subjects/:id",
        [authJwt.isAdmin, objectId.validId],
        subject.delete
    );
    //admins
    router.get("/subjects", [authJwt.verifyToken], subject.get);
    router.get(
        "/subjects/:id",
        [authJwt.verifyToken, objectId.validId],
        subject.getId
    );
    module.exports = router;