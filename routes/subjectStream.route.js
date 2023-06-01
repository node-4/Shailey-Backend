const subjectStream = require("../controllers/subjectStream.controller");
const { authJwt, objectId } = require("../middlewares");
const express = require("express");
const router = express.Router();   
 router.post("api/v1/admin/streams", [authJwt.isAdmin], subjectStream.create);
    router.get("api/v1/admin/streams", [authJwt.isAdmin], subjectStream.get);
    router.get(
        "api/v1/admin/streams/:id",
        [authJwt.isAdmin, objectId.validId],
        subjectStream.getId
    );
    router.put(
        "api/v1/admin/streams/:id",
        [authJwt.isAdmin, objectId.validId],
        subjectStream.update
    );
    router.delete(
        "api/v1/admin/streams/:id",
        [authJwt.isAdmin, objectId.validId],
        subjectStream.delete
    );
    //admins
    router.get("api/v1/streams", [authJwt.verifyToken], subjectStream.get);
    router.get(
        "api/v1/streams/:id",
        [authJwt.verifyToken, objectId.validId],
        subjectStream.getId
    );
    module.exports = router;