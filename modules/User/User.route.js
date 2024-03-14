var express = require("express");
var router = express.Router();
const UserController = require("./User.controller");

/* USER  */
router.post("/signup", UserController.UserCreate);
router.post("/login", UserController.login);

module.exports = router;
