const WORKEXPERIENCE = require("./WorkExperience.model");

// WorkExperience
exports.getWorkExperience = async function (req, res, next) {
  try {
    let data = await WORKEXPERIENCE.find({ userId: req.userId });

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

exports.updateWorkExperience = async function (req, res, next) {
  try {
    let updateId = req.params.updateId;
    let data;
    let message = "";
    if (!updateId) {
      if (
        !req.body.companyName ||
        !req.body.title ||
        !req.body.startDate ||
        !req.body.endDate ||
        !req.body.description
      ) {
        throw new Error("Please enter valid fields");
      }

      data = await WORKEXPERIENCE.create({
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

      await WORKEXPERIENCE.findByIdAndUpdate(updateId, updateData);

      data = await WORKEXPERIENCE.findById(updateId);
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

exports.removeWorkExperience = async function (req, res, next) {
  try {
    let removeId = req.params.removeId;
    await WORKEXPERIENCE.findByIdAndDelete(removeId);

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
