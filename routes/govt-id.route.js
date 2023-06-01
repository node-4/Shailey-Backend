const govtIdController = require("../controllers/govt-id");
const express = require("express");
const router = express.Router();
    router.post("api/v1/govt-Id", govtIdController.createGovtId);
    router.get("api/v1/govt-Id", govtIdController.getGovtIds);
    router.get("api/v1/govt-Id/:id", govtIdController.getGovtId);
    router.put("api/v1/govt-Id/:id", govtIdController.updateGovtId);
    router.delete("api/v1/govt-Id/:id", govtIdController.deleteGovtId);
    module.exports = router;
