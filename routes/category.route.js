const category = require("../controllers/category.controller");
const { authJwt, objectId } = require("../middlewares");
const express = require("express");
const router = express.Router();
    router.post("api/v1/admin/categories", [authJwt.isAdmin], category.create);
    router.get("api/v1/admin/categories", category.get);
    router.get( "api/v1/admin/categories/:id", [authJwt.isAdmin, objectId.validId], category.getId);
    router.put( "api/v1/admin/categories/:id", [authJwt.isAdmin, objectId.validId], category.updateCategory);
    router.delete( "api/v1/admin/categories/:id", [authJwt.isAdmin, objectId.validId], category.delete);
    //admins
    router.get("api/v1/categories", [authJwt.verifyToken], category.get);
    router.get( "api/v1/categories/:id", [authJwt.verifyToken, objectId.validId], category.getId);
    module.exports = router;
