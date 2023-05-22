const topicController = require("../controllers/topic_controller");
const { authJwt, objectId } = require("../middlewares");
module.exports = (app) => {
  app.put(
    "/api/v1/topics/:id",
    [authJwt.verifyToken, objectId.validId],
    topicController.updateTeacherTopics
  );
  app.put(
    "/api/v1/stopics/:id",
    [authJwt.verifyToken, objectId.validId],
    topicController.updateStudentTopics
  );
  app.put(
    "/api/v1/admin/topics/:id",
    [authJwt.isAdmin, objectId.validId],
    topicController.updateTeacherTopics
  );
  app.put(
    "/api/v1/admin/stopics/:id",
    [authJwt.isAdmin, objectId.validId],
    topicController.updateStudentTopics
  );
};
