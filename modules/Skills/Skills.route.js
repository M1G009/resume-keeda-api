var express = require("express");
var router = express.Router();
const UserController = require("../User/User.controller");
const SkillsController = require("./Skills.controller");

//skills
router.get("/", UserController.secure, SkillsController.getSkills);
router.post(
  "/:updateId?",
  UserController.secure,
  SkillsController.updateSkills
);
router.post(
  "/:removeId?",
  UserController.secure,
  SkillsController.removeSkills
);

module.exports = router;
