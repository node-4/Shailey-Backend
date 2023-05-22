const aboutUsController = require("../controllers/aboutUs_controller");
const { isValidId, authJwt, objectId } = require("../middlewares");
module.exports = (app) => {
  app.post("/api/v1/aboutus", [authJwt.isAdmin], aboutUsController.create);
  app.put(
    "/api/v1/aboutus/:id",
    [authJwt.isAdmin, objectId.validId],
    aboutUsController.updateAboutUs
  );
  app.get(
    "/api/v1/aboutus/:id",
    [objectId.validId],
    aboutUsController.getAboutUs
  );
  app.get("/api/v1/aboutus", aboutUsController.getAll);
};
