const terms = require("../controllers/terms.controller");
const { authJwt, objectId } = require("../middlewares");
const express = require("express");
const router = express.Router();

router.post("/admin/terms", [authJwt.isAdmin], terms.create);
router.put("/admin/terms/:id",[authJwt.isAdmin, objectId.validId],terms.update);
router.get("/admin/terms/:id", terms.getId);
router.get("/admin/terms", terms.get);
router.delete("/admin/terms/:id",[authJwt.isAdmin, objectId.validId],terms.delete);
router.get("/terms/:id", [objectId.validId], terms.getId);
router.get("/Allterms", terms.get);
module.exports = router;
