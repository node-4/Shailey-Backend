const authController = require("../controllers/admin_controller");
const { objectId, authJwt, validateBodies } = require("../middlewares");
const express = require("express");
const router = express.Router();
  router.post(
    "/admin/auth/signup",
    [validateBodies.signUpBody],
    authController.signUp
  );
  router.post(
    "/admin/auth/signin",
    [validateBodies.signInBody],
    authController.signIn
  );

  router.get("/admin", [authJwt.isAdmin], authController.getAdmins);
  router.put(
    "/admin/:id",
    [authJwt.isAdmin, objectId.validId],
    authController.updateAdmin
  );

  router.delete(
    "/admin/:id",
    [authJwt.isAdmin, objectId.validId],
    authController.deleteAdmin
  );
  //   router.get(
  //     "/admin/:id",
  //     [authJwt.isAdmin, , objectId.validId],
  //     authController.findByAdminId
  //   );
module.exports = router;
