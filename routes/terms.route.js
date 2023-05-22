const terms = require("../controllers/terms.controller");
const { authJwt, objectId } = require("../middlewares");

module.exports = (app) => {
  app.post("/api/v1/admin/terms", [authJwt.isAdmin], terms.create);
  app.put(
    "/api/v1/admin/terms/:id",
    [authJwt.isAdmin, objectId.validId],
    terms.update
  );
  app.get("/api/v1/admin/terms/:id", terms.getId);
  app.get("/api/v1/admin/terms", terms.get);
  app.delete(
    "/api/v1/admin/terms/:id",
    [authJwt.isAdmin, objectId.validId],
    terms.delete
  );

  app.get("/api/v1/terms/:id", [objectId.validId], terms.getId);
  app.get("/api/v1/terms", terms.get);
};
