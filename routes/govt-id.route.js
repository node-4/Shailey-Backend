const govtIdController = require("../controllers/govt-id");
module.exports = (app) => {
    app.post("/api/v1/govt-Id", govtIdController.createGovtId);
    app.get("/api/v1/govt-Id", govtIdController.getGovtIds);
    app.get("/api/v1/govt-Id/:id", govtIdController.getGovtId);
    app.put("/api/v1/govt-Id/:id", govtIdController.updateGovtId);
    app.delete("/api/v1/govt-Id/:id", govtIdController.deleteGovtId);
};
