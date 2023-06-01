const category = require("../controllers/category.controller");
const { authJwt, objectId } = require("../middlewares");
const express = require("express");
const router = express.Router();
    router.post("/admin/categories", [authJwt.isAdmin], category.create);
    router.get("/admin/categories", category.get);
    router.get( "/admin/categories/:id", [authJwt.isAdmin, objectId.validId], category.getId);
    router.put( "/admin/categories/:id", [authJwt.isAdmin, objectId.validId], category.updateCategory);
    router.delete( "/admin/categories/:id", [authJwt.isAdmin, objectId.validId], category.delete);
    //admins
    router.get("/categories", [authJwt.verifyToken], category.get);
    router.get( "/categories/:id", [authJwt.verifyToken, objectId.validId], category.getId);
    module.exports = router;
