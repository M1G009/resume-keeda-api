const PROFESSIONALDETAILS = require("./ProfessionalDetails.model");

// ProfessionalDetails
exports.getProfessionalDetails = async function (req, res, next) {
  try {
    let data = await PROFESSIONALDETAILS.findOne({ userId: req.userId });

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

exports.updateProfessionalDetails = async function (req, res, next) {
  try {
    let updateId = req.params.updateId;
    let data;
    let message = "";
    if (!updateId) {
      if (
        !req.body.Profession ||
        !req.body.Qualification ||
        !req.body.languageKnown ||
        !req.body.yearsOfExperience
      ) {
        throw new Error("Please enter valid fields");
      }

      let checkProfessionalDetails = await PROFESSIONALDETAILS.findOne({
        userId: req.userId,
      });

      if (checkProfessionalDetails) {
        throw new Error("Professional Details is already added");
      }

      data = await PROFESSIONALDETAILS.create({
        ...req.body,
        userId: req.userId,
      });
      message = "Data Add successfull";
    } else {
      let updateData = { ...req.body };

      Object.keys(updateData).map((key) => {
        if (!updateData[key]) {
          delete updateData[key];
        }
      });

      await PROFESSIONALDETAILS.findByIdAndUpdate(updateId, updateData);

      data = await PROFESSIONALDETAILS.findById(updateId);
      message = "Data Update successfull";
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
