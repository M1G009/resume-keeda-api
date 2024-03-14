var express = require("express");
var router = express.Router();
const UserController = require("../User/User.controller");
const WorkExperienceController = require("./WorkExperience.controller");

//workexperience
router.get(
  "/",
  UserController.secure,
  WorkExperienceController.getWorkExperience
);
router.post(
  "/:updateId?",
  UserController.secure,
  WorkExperienceController.updateWorkExperience
);
router.delete(
  "/:removeId?",
  UserController.secure,
  WorkExperienceController.removeWorkExperience
);
module.exports = router;
