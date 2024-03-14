var express = require("express");
var router = express.Router();
const UserController = require("../User/User.controller");
const EducationsDetailsController = require("./EducationsDetails.controller");

//educationsdetails
router.get(
  "/",
  UserController.secure,
  EducationsDetailsController.getEducationsDetails
);
router.post(
  "/:updateId?",
  UserController.secure,
  EducationsDetailsController.updateEducationsDetails
);
router.delete(
  "/:removeId?",
  UserController.secure,
  EducationsDetailsController.removeEducationsDetail
);

module.exports = router;
