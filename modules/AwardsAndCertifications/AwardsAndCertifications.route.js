var express = require("express");
var router = express.Router();
const UserController = require("../User/User.controller");
const AwardsAndCertificationsController = require("./AwardsAndCertifications.controller");

//awards And certifications
router.get(
  "/",
  UserController.secure,
  AwardsAndCertificationsController.getAwardsAndCertifications
);

router.post(
  "/:updateId?",
  UserController.secure,
  AwardsAndCertificationsController.addUpdateAwardsAndCertifications
);

router.delete(
  "/:removeId?",
  UserController.secure,
  AwardsAndCertificationsController.removeAwardsAndCertifications
);

module.exports = router;
