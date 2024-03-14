const Theme = require("./Theme.model");

// Theme
exports.getTheme = async function (req, res, next) {
  try {
    let data = await Theme.find();

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

exports.updateTheme = async function (req, res, next) {
  try {
    let updateId = req.params.updateId;
    let data;
    let message = "";
    if (!updateId) {
      if (!req.file || !req.file.filename || !req.body.name) {
        throw new Error("Please enter valid fields");
      }

      data = await Theme.create({
        ...req.body,
        theme: req.file.filename,
      });
      message = "Data add successfull";
    } else {
      let updateData = { ...req.body };
      if (req.file && req.file.filename) {
        updateData.theme = req.file.filename;
      }

      Object.keys(updateData).map((key) => {
        if (!updateData[key]) {
          delete updateData[key];
        }
      });

      await Theme.findByIdAndUpdate(updateId, updateData);

      message = "Data update successfull";
    }

    res.status(200).json({
      status: "success",
      message,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.deleteTheme = async function (req, res, next) {
  try {
    let deleteId = req.params.deleteId;
    await Theme.findByIdAndDelete(deleteId);

    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};
