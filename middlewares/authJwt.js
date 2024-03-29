const jwt = require("jsonwebtoken");
const LoginModel = require("../models/otp.model");
const authConfig = require("../configs/auth.configs");
const AdminModel = require("../models/admin.model");

const verifyToken = (req, res, next) => {
  const token =
    req.headers["x-access-token"] ||
    req.get("Authorization")?.split("Bearer ")[1];

  if (!token) {
    return res.status(403).send({
      message: "no token provided! Access prohibited",
    });
  }

  jwt.verify(token, authConfig.secret, async (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "UnAuthorised !",
      });
    }
    const user = await LoginModel.findOne({ phone: decoded.id });
    // console.log(user);
    if (!user) {
      return res.status(400).send({
        message: "The user that this token belongs to does not exist",
      });
    }
    req.user = user;

    next();
  });
};
const isAdmin = (req, res, next) => {
  const token =
    req.headers["x-access-token"] ||
    req.get("Authorization")?.split("Bearer ")[1];
  // console.log(token);
  if (!token) {
    return res.status(403).send({
      message: "no token provided! Access prohibited",
    });
  }

  jwt.verify(token, authConfig.secret, async (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "UnAuthorised ! Admin role is required! ",
      });
    }
    // console.log(decoded);
    const user = await AdminModel.findOne({ email: decoded.admin });
    // console.log(user);
    if (!user) {
      return res.status(400).send({
        message: "The admin that this  token belongs to does not exist",
      });
    }
    req.user = user;

    next();
  });
};

module.exports = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
};
