const subjectStream = require("../controllers/subjectStream.controller");
const { authJwt, objectId } = require("../middlewares");
module.exports = (app) => {
  app.post("/api/v1/admin/streams", [authJwt.isAdmin], subjectStream.create);
  app.get("/api/v1/admin/streams", [authJwt.isAdmin], subjectStream.get);
  app.get(
    "/api/v1/admin/streams/:id",
    [authJwt.isAdmin, objectId.validId],
    subjectStream.getId
  );
  app.put(
    "/api/v1/admin/streams/:id",
    [authJwt.isAdmin, objectId.validId],
    subjectStream.update
  );
  app.delete(
    "/api/v1/admin/streams/:id",
    [authJwt.isAdmin, objectId.validId],
    subjectStream.delete
  );
  //admins
  app.get("/api/v1/streams", [authJwt.verifyToken], subjectStream.get);
  app.get(
    "/api/v1/streams/:id",
    [authJwt.verifyToken, objectId.validId],
    subjectStream.getId
  );
};
