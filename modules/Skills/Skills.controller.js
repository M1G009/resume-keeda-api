const SKILLS = require("./Skills.model");

// Skills
exports.getSkills = async function (req, res, next) {
  try {
    let data = await SKILLS.find({ userId: req.userId });

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

exports.updateSkills = async function (req, res, next) {
  try {
    let updateId = req.params.updateId;
    let data;
    let message = "";
    if (!updateId) {
      if (!req.body.name || !req.body.rate) {
        throw new Error("Please enter valid fields");
      }

      data = await SKILLS.create({
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

      await SKILLS.findByIdAndUpdate(updateId, updateData, {
        runValidators: true,
      });

      data = await SKILLS.findById(updateId);
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

exports.removeSkills = async function (req, res, next) {
  try {
    let removeId = req.params.removeId;
    await SKILLS.findByIdAndDelete(removeId);

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
