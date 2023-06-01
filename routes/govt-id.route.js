const govtIdController = require("../controllers/govt-id");
const express = require("express");
const router = express.Router();
    router.post("/govt-Id", govtIdController.createGovtId);
    router.get("/govt-Id", govtIdController.getGovtIds);
    router.get("/govt-Id/:id", govtIdController.getGovtId);
    router.put("/govt-Id/:id", govtIdController.updateGovtId);
    router.delete("/govt-Id/:id", govtIdController.deleteGovtId);
    module.exports = router;
