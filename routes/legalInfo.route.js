const legalInfo = require("../controllers/legalInformation_controller");

const { isValidId, authJwt, objectId } = require("../middlewares");
const express = require("express");
const router = express.Router();
    router.post(
        "/admin/legalInformations",
        [authJwt.isAdmin],
        legalInfo.createLegalInformation
    );
    router.put(
        "/admin/legalInformations/:id",
        [authJwt.isAdmin, objectId.validId],
        legalInfo.updateLegalInformation
    );
    router.delete(
        "/admin/legalInformations/:id",
        [authJwt.isAdmin, objectId.validId],
        legalInfo.deleteLegalInformation
    );
    router.get(
        "/admin/legalInformations",

        legalInfo.getAllLegalInformation
    );
    router.get(
        "/admin/legalInformations/:id",
        [objectId.validId],
        legalInfo.getLegalInformationById
    );
    router.get(
        "/legalInformations",

        legalInfo.getAllLegalInformation
    );
    router.get(
        "/legalInformations/:id",
        [objectId.validId],
        legalInfo.getLegalInformationById
    );
    module.exports = router;
