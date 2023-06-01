const aboutUsController = require("../controllers/aboutUs_controller");
const { isValidId, authJwt, objectId } = require("../middlewares");
const express = require("express");
const router = express.Router();
router.post("api/v1/aboutus", [authJwt.isAdmin], aboutUsController.create);
router.put(
    "api/v1/aboutus/:id",
    [authJwt.isAdmin, objectId.validId],
    aboutUsController.updateAboutUs
);
router.get(
    "api/v1/aboutus/:id",
    [objectId.validId],
    aboutUsController.getAboutUs
);
router.get("api/v1/aboutus", aboutUsController.getAll);
module.exports = router;
