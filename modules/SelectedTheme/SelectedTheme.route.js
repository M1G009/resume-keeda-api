var express = require("express");
var router = express.Router();
const UserController = require("../User/User.controller");
const SelectedThemeController = require("./SelectedTheme.controller");

/* Resume */
//SelectedTheme
router.get(
  "/",
  UserController.secure,
  SelectedThemeController.getSelectedTheme
);
router.post(
  "/checkurl",
  UserController.secure,
  SelectedThemeController.selectedTheme
);
router.post(
  "/",
  UserController.secure,
  SelectedThemeController.createUpdateThemeSelect
);

module.exports = router;
