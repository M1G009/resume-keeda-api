var express = require("express");
var router = express.Router();
const AdminController = require("./Admin.controller");

/* Auth  */
router.post("/signup", AdminController.adminCreate);
router.post("/login", AdminController.login);

module.exports = router;
