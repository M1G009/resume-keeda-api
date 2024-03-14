const SelectedTheme = require("./SelectedTheme.model");

// SelectedTheme
exports.getSelectedTheme = async function (req, res, next) {
  try {
    let data = await SelectedTheme.findOne({ user: req.userId });

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

exports.selectedTheme = async function (req, res, next) {
  try {
    if (!req.body.slug) {
      throw new Error("Please enter valid fields");
    }

    const checkUser = await SelectedTheme.findOne({ slug: req.body.slug });

    res.status(200).json({
      status: "success",
      data: checkUser ? false : true,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.deleteSelectedTheme = async function (req, res, next) {
  try {
    let deleteId = req.params.deleteId;
    await SelectedTheme.findByIdAndDelete(deleteId);

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
