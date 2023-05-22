const category = require("../controllers/category.controller");
const { authJwt, objectId } = require("../middlewares");
module.exports = (app) => {
  app.post("/api/v1/admin/categories", [authJwt.isAdmin], category.create);
  app.get("/api/v1/admin/categories", category.get);
  app.get(
    "/api/v1/admin/categories/:id",
    [authJwt.isAdmin, objectId.validId],
    category.getId
  );
  app.put(
    "/api/v1/admin/categories/:id",
    [authJwt.isAdmin, objectId.validId],
    category.updateCategory
  );
  app.delete(
    "/api/v1/admin/categories/:id",
    [authJwt.isAdmin, objectId.validId],
    category.delete
  );
  //admins
  app.get("/api/v1/categories", [authJwt.verifyToken], category.get);
  app.get(
    "/api/v1/categories/:id",
    [authJwt.verifyToken, objectId.validId],
    category.getId
  );
};
