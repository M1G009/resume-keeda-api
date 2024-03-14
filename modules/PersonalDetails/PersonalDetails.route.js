var express = require("express");
var router = express.Router();
const UserController = require("../User/User.controller");
const PersonalDetailsController = require("./PersonalDetails.controller");
const FileUpload = require("../../utility/FileUpload");

/* Resume */
//personaldetails
router.get(
  "/",
  UserController.secure,
  PersonalDetailsController.getPersonalDetails
);
router.post(
  "/:updateId?",
  UserController.secure,
  FileUpload.single("userProfileImage"),
  PersonalDetailsController.updatePersonalDetails
);

module.exports = router;
