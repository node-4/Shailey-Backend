const reviewController = require("../controllers/review.controller");
const { isValidId, authJwt, objectId } = require("../middlewares");
module.exports = (app) => {
  app.post(
    "/api/v1/teachers/:teacherId/reviews",
    [authJwt.verifyToken],
    reviewController.createReview
  );
  app.post(
    "/api/v1/students/:studentId/reviews",
    [authJwt.verifyToken],
    reviewController.createReview
  );
  app.put(
    "/api/v1/reviews/:id",
    [authJwt.verifyToken],
    reviewController.updateReview
  );
  app.put(
    "/api/v1/admin/reviews/:id",
    //[authJwt.isAdmin, objectId.validId],
    reviewController.updateReview
  );
  app.get("/api/v1/reviews", reviewController.getAllReviews);
  app.get("/api/v1/admin/reviews", reviewController.getAllReviews);
  app.delete(
    "/api/v1/admin/reviews/:id",
    //[authJwt.isAdmin, objectId.validId],
    reviewController.deleteReviewById
  );
  app.get(
    "/api/v1/reviews/:id",
    [objectId.validId],
    reviewController.getReviewById
  );

  app.get(
    "/api/v1/admin/reviews/:id",
    [objectId.validId],
    reviewController.getReviewById
  );
};
