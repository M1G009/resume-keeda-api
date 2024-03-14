var express = require("express");
var router = express.Router();
const UserController = require("../User/User.controller");
const ProfessionalDetailsController = require("./ProfessionalDetails.controller");

//professionaldetails
router.get(
  "/",
  UserController.secure,
  ProfessionalDetailsController.getProfessionalDetails
);
router.post(
  "/:updateId?",
  UserController.secure,
  ProfessionalDetailsController.updateProfessionalDetails
);

module.exports = router;
