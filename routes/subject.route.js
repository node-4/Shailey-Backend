const subject = require("../controllers/subject.controller");
const { authJwt, objectId } = require("../middlewares");
const express = require("express");
const router = express.Router(); 
   router.post("api/v1/admin/subjects", [authJwt.isAdmin], subject.create);
    router.get("api/v1/admin/subjects", [authJwt.isAdmin], subject.get);
    router.get(
        "api/v1/admin/subjects/:id",
        [authJwt.isAdmin, objectId.validId],
        subject.getId
    );
    router.put(
        "api/v1/admin/subjects/:id",
        [authJwt.isAdmin, objectId.validId],
        subject.update
    );
    router.delete(
        "api/v1/admin/subjects/:id",
        [authJwt.isAdmin, objectId.validId],
        subject.delete
    );
    //admins
    router.get("api/v1/subjects", [authJwt.verifyToken], subject.get);
    router.get(
        "api/v1/subjects/:id",
        [authJwt.verifyToken, objectId.validId],
        subject.getId
    );
    module.exports = router;