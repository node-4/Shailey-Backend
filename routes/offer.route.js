const express = require("express");
const offer_controllers = require("../controllers/offers_controllers");
const { authJwt } = require("../middlewares");

const router = express();

router.post("/offer", [authJwt.isAdmin], offer_controllers.addoffer);
router.get("/offer", [authJwt.isAdmin], offer_controllers.getOffers);
router.delete("/offer/:id", [authJwt.isAdmin], offer_controllers.deleteOffers);

module.exports = router;
