const authController = require("../controllers/auth_controller");
const express = require("express");
const router = express.Router();

//user login
router.post("/login", authController.login);
router.post("/verify", authController.verifyOtp);
router.post("/socialLogin", authController.socialLogin);
//User Register
//router.post('/userinfo', userControllers.AddUserInfo);

module.exports = router;
