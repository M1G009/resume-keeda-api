const EDUCATIONSDETAILS = require("./EducationsDetails.model");

// EducationsDetails
exports.getEducationsDetails = async function (req, res, next) {
  try {
    let data = await EDUCATIONSDETAILS.find({ userId: req.userId });

    res.status(200).json({
      status: "success",
      message: "All data found",
      data,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.updateEducationsDetails = async function (req, res, next) {
  try {
    let updateId = req.params.updateId;
    let data;
    let message = "";

    if (!updateId) {
      if (
        !req.body.degree ||
        !req.body.school ||
        !req.body.grade ||
        !req.body.passingYear
      ) {
        throw new Error("Please enter valid fields");
      }

      data = await EDUCATIONSDETAILS.create({
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

      await EDUCATIONSDETAILS.findByIdAndUpdate(updateId, updateData);

      data = await EDUCATIONSDETAILS.findById(updateId);
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

exports.removeEducationsDetail = async function (req, res, next) {
  try {
    let removeId = req.params.removeId;
    await EDUCATIONSDETAILS.findByIdAndDelete(removeId);

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
