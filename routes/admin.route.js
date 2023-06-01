const authController = require("../controllers/admin_controller");
const { objectId, authJwt, validateBodies } = require("../middlewares");
const express = require("express");
const router = express.Router();
  router.post(
    "api/v1/admin/auth/signup",
    [validateBodies.signUpBody],
    authController.signUp
  );
  router.post(
    "api/v1/admin/auth/signin",
    [validateBodies.signInBody],
    authController.signIn
  );

  router.get("api/v1/admin", [authJwt.isAdmin], authController.getAdmins);
  router.put(
    "api/v1/admin/:id",
    [authJwt.isAdmin, objectId.validId],
    authController.updateAdmin
  );

  router.delete(
    "api/v1/admin/:id",
    [authJwt.isAdmin, objectId.validId],
    authController.deleteAdmin
  );
  //   router.get(
  //     "api/v1/admin/:id",
  //     [authJwt.isAdmin, , objectId.validId],
  //     authController.findByAdminId
  //   );
module.exports = router;
