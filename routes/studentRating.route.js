const StudentRatingController = require("../controllers/studentRating_controller");
const { isValidId, authJwt, objectId } = require("../middlewares");
module.exports = (app) => {
  app.post(
    "/api/v1/ratings",
    [authJwt.verifyToken],
    StudentRatingController.createStudentRating
  );
  app.post(
    "/api/v1/ratings/:teacherId",
    [authJwt.verifyToken],
    StudentRatingController.getRatingByTeacherId
  );
  app.get(
    "/api/v1/ratings/:id",
    [authJwt.verifyToken, objectId.validId],
    StudentRatingController.getStudentRating
  );
  app.get(
    "/api/v1/rating/teachers/:teacherId",
    [authJwt.verifyToken],
    StudentRatingController.getRatingByTeacherId
  );

  app.get(
    "/api/v1/admin/ratings/:id",
    [authJwt.isAdmin, objectId.validId],
    StudentRatingController.getStudentRating
  );
  // app.get(
  //   "/api/v1/admin/ratings/{teacherId}",
  //   [authJwt.isAdmin],
  //   StudentRatingController.getRatingByTeacherId
  // );
  app.get(
    "/api/v1/admin/ratings/:id",
    [authJwt.isAdmin, objectId.validId],
    StudentRatingController.delete
  );
};
