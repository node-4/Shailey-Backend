const subject = require("../controllers/subject.controller");
const { authJwt, objectId } = require("../middlewares");
module.exports = (app) => {
  app.post("/api/v1/admin/subjects", [authJwt.isAdmin], subject.create);
  app.get("/api/v1/admin/subjects", [authJwt.isAdmin], subject.get);
  app.get(
    "/api/v1/admin/subjects/:id",
    [authJwt.isAdmin, objectId.validId],
    subject.getId
  );
  app.put(
    "/api/v1/admin/subjects/:id",
    [authJwt.isAdmin, objectId.validId],
    subject.update
  );
  app.delete(
    "/api/v1/admin/subjects/:id",
    [authJwt.isAdmin, objectId.validId],
    subject.delete
  );
  //admins
  app.get("/api/v1/subjects", [authJwt.verifyToken], subject.get);
  app.get(
    "/api/v1/subjects/:id",
    [authJwt.verifyToken, objectId.validId],
    subject.getId
  );
};
