const aboutUsController = require("../controllers/aboutUs_controller");
const { isValidId, authJwt, objectId } = require("../middlewares");
const express = require("express");
const router = express.Router();
router.post("/aboutus", [authJwt.isAdmin], aboutUsController.create);
router.put(
    "/aboutus/:id",
    [authJwt.isAdmin, objectId.validId],
    aboutUsController.updateAboutUs
);
router.get(
    "/aboutus/:id",
    [objectId.validId],
    aboutUsController.getAboutUs
);
router.get("/aboutus", aboutUsController.getAll);
module.exports = router;
