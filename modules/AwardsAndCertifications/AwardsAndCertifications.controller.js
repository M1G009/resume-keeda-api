const AWARDANDCERTIFICATE = require("./AwardsAndCertifications.model");

// AwardsAndCertifications
exports.getAwardsAndCertifications = async function (req, res, next) {
  try {
    let data = await AWARDANDCERTIFICATE.find({ userId: req.userId });

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.addUpdateAwardsAndCertifications = async function (req, res, next) {
  try {
    let updateId = req.params.updateId;
    let data;
    let message = "";
    if (!updateId) {
      if (!req.body.title || !req.body.provider) {
        throw new Error("Please enter valid fields");
      }

      data = await AWARDANDCERTIFICATE.create({
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

      await AWARDANDCERTIFICATE.findByIdAndUpdate(updateId, updateData, {
        runValidators: true,
      });

      data = await AWARDANDCERTIFICATE.findById(updateId);
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

exports.removeAwardsAndCertifications = async function (req, res, next) {
  try {
    let removeId = req.params.removeId;
    await AWARDANDCERTIFICATE.findByIdAndDelete(removeId);

    res.status(204).json({
      status: "success",
      message: "Data delete successfull",
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};
