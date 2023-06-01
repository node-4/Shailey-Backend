const subjectStream = require("../controllers/subjectStream.controller");
const { authJwt, objectId } = require("../middlewares");
const express = require("express");
const router = express.Router();   
 router.post("/admin/streams", [authJwt.isAdmin], subjectStream.create);
    router.get("/admin/streams", [authJwt.isAdmin], subjectStream.get);
    router.get(
        "/admin/streams/:id",
        [authJwt.isAdmin, objectId.validId],
        subjectStream.getId
    );
    router.put(
        "/admin/streams/:id",
        [authJwt.isAdmin, objectId.validId],
        subjectStream.update
    );
    router.delete(
        "/admin/streams/:id",
        [authJwt.isAdmin, objectId.validId],
        subjectStream.delete
    );
    //admins
    router.get("/streams", [authJwt.verifyToken], subjectStream.get);
    router.get(
        "/streams/:id",
        [authJwt.verifyToken, objectId.validId],
        subjectStream.getId
    );
    module.exports = router;