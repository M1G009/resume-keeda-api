const PERSONALDETAILS = require("./PersonalDetails.model");
const fs = require("fs");
const path = require("path");

// PersonalDetails
exports.getPersonalDetails = async function (req, res, next) {
  try {
    let data = await PERSONALDETAILS.findOne({ userId: req.userId }).populate(
      "userId"
    );

    res.status(200).json({
      status: "success",
      message: "Data found successfull",
      data,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.updatePersonalDetails = async function (req, res, next) {
  try {
    let updateId = req.params.updateId;
    let data;
    let message = "";
    if (!updateId) {
      if (
        !req.file ||
        !req.file.filename ||
        !req.body.mobileNumber ||
        !req.body.gender ||
        !req.body.DOB ||
        !req.body.Address ||
        !req.body.pincode
      ) {
        throw new Error("Please enter valid fields");
      }

      let checkPersonalDetails = await PERSONALDETAILS.findOne({
        userId: req.userId,
      });

      if (checkPersonalDetails) {
        throw new Error("Personal Details is already added");
      }

      data = await PERSONALDETAILS.create({
        ...req.body,
        userProfileImage: req.file.filename,
        userId: req.userId,
      });
      message = "Data add successfull";
    } else {
      let updateData = { ...req.body };
      if (req.file && req.file.filename) {
        updateData.userProfileImage = req.file.filename;
      }

      Object.keys(updateData).map((key) => {
        if (!updateData[key]) {
          delete updateData[key];
        }
      });

      await PERSONALDETAILS.findByIdAndUpdate(updateId, updateData);

      data = await PERSONALDETAILS.findById(updateId);
      message = "Data update successfull";
    }

    res.status(200).json({
      status: "success",
      message,
      data,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};
