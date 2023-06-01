const legalInfo = require("../controllers/legalInformation_controller");

const { isValidId, authJwt, objectId } = require("../middlewares");
const express = require("express");
const router = express.Router();
    router.post(
        "api/v1/admin/legalInformations",
        [authJwt.isAdmin],
        legalInfo.createLegalInformation
    );
    router.put(
        "api/v1/admin/legalInformations/:id",
        [authJwt.isAdmin, objectId.validId],
        legalInfo.updateLegalInformation
    );
    router.delete(
        "api/v1/admin/legalInformations/:id",
        [authJwt.isAdmin, objectId.validId],
        legalInfo.deleteLegalInformation
    );
    router.get(
        "api/v1/admin/legalInformations",

        legalInfo.getAllLegalInformation
    );
    router.get(
        "api/v1/admin/legalInformations/:id",
        [objectId.validId],
        legalInfo.getLegalInformationById
    );
    router.get(
        "api/v1/legalInformations",

        legalInfo.getAllLegalInformation
    );
    router.get(
        "api/v1/legalInformations/:id",
        [objectId.validId],
        legalInfo.getLegalInformationById
    );
    module.exports = router;
