const privacy = require("../controllers/privacy.controller");
const { authJwt, objectId } = require("../middlewares");
const express = require("express");
const router = express.Router();
    router.post("/admin/privacy", [authJwt.isAdmin], privacy.addPrivacy);
    router.get("/admin/privacy", privacy.getPrivacy);
    router.get("/privacy", privacy.getPrivacy);
    router.put(
        "/admin/privacy/:id",
        [authJwt.isAdmin, objectId.validId],
        privacy.updatePolicy
    );
    router.delete(
        "/admin/privacy/:id",
        [authJwt.isAdmin],
        privacy.DeletePolicy
    );
    module.exports = router;

