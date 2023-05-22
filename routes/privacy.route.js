const privacy = require("../controllers/privacy.controller");
const { authJwt, objectId } = require("../middlewares");

module.exports = (app) => {
  app.post("/api/v1/admin/privacy", [authJwt.isAdmin], privacy.addPrivacy);
  app.get("/api/v1/admin/privacy", privacy.getPrivacy);
  app.get("/api/v1/privacy", privacy.getPrivacy);
  app.put(
    "/api/v1/admin/privacy/:id",
    [authJwt.isAdmin, objectId.validId],
    privacy.updatePolicy
  );
  app.delete(
    "/api/v1/admin/privacy/:id",
    [authJwt.isAdmin],
    privacy.DeletePolicy
  );
};
