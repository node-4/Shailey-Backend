const privacy = require("../controllers/privacy.controller");
const { authJwt, objectId } = require("../middlewares");
const express = require("express");
const router = express.Router();
    router.post("api/v1/admin/privacy", [authJwt.isAdmin], privacy.addPrivacy);
    router.get("api/v1/admin/privacy", privacy.getPrivacy);
    router.get("api/v1/privacy", privacy.getPrivacy);
    router.put(
        "api/v1/admin/privacy/:id",
        [authJwt.isAdmin, objectId.validId],
        privacy.updatePolicy
    );
    router.delete(
        "api/v1/admin/privacy/:id",
        [authJwt.isAdmin],
        privacy.DeletePolicy
    );
    module.exports = router;

