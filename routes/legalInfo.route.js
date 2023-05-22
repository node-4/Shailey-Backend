const legalInfo = require("../controllers/legalInformation_controller");

const { isValidId, authJwt, objectId } = require("../middlewares");
module.exports = (app) => {
    app.post(
        "/api/v1/admin/legalInformations",
        [authJwt.isAdmin],
        legalInfo.createLegalInformation
    );
    app.put(
        "/api/v1/admin/legalInformations/:id",
        [authJwt.isAdmin, objectId.validId],
        legalInfo.updateLegalInformation
    );
    app.delete(
        "/api/v1/admin/legalInformations/:id",
        [authJwt.isAdmin, objectId.validId],
        legalInfo.deleteLegalInformation
    );
    app.get(
        "/api/v1/admin/legalInformations",

        legalInfo.getAllLegalInformation
    );
    app.get(
        "/api/v1/admin/legalInformations/:id",
        [objectId.validId],
        legalInfo.getLegalInformationById
    );
    app.get(
        "/api/v1/legalInformations",

        legalInfo.getAllLegalInformation
    );
    app.get(
        "/api/v1/legalInformations/:id",
        [objectId.validId],
        legalInfo.getLegalInformationById
    );
};
