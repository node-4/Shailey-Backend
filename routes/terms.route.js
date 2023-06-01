const terms = require("../controllers/terms.controller");
const { authJwt, objectId } = require("../middlewares");
const express = require("express");
const router = express.Router();

router.post("api/v1/admin/terms", [authJwt.isAdmin], terms.create);
router.put("api/v1/admin/terms/:id",[authJwt.isAdmin, objectId.validId],terms.update);
router.get("api/v1/admin/terms/:id", terms.getId);
router.get("api/v1/admin/terms", terms.get);
router.delete("api/v1/admin/terms/:id",[authJwt.isAdmin, objectId.validId],terms.delete);
router.get("api/v1/terms/:id", [objectId.validId], terms.getId);
router.get("api/v1/terms", terms.get);
module.exports = router;
