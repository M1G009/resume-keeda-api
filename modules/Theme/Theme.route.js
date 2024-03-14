var express = require("express");
var router = express.Router();
const AdminController = require("../admin/Admin.controller");
const ThemeController = require("./Theme.controller");
const FileUpload = require("../../utility/FileUpload");

/* Resume */
//Theme
router.get("/", ThemeController.getTheme);
router.post(
  "/:updateId?",
  AdminController.secure,
  FileUpload.single("theme"),
  ThemeController.updateTheme
);
router.delete(
  "/:deleteId?",
  AdminController.secure,
  ThemeController.deleteTheme
);

module.exports = router;
