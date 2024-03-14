var express = require("express");
var router = express.Router();
const UserController = require("../User/User.controller");
const ProjectDetailsController = require("./ProjectDetails.controller");
const FileUpload = require("../../utility/FileUpload");

// Projects
router.get(
  "/",
  UserController.secure,
  ProjectDetailsController.getProjectDetails
);
router.post(
  "/:updateId?",
  UserController.secure,
  FileUpload.fields([{ name: "images", maxCount: 10 }]),
  ProjectDetailsController.updateProjectDetails
);
router.delete(
  "/:removeId?",
  UserController.secure,
  ProjectDetailsController.removeProjectDetails
);

module.exports = router;
