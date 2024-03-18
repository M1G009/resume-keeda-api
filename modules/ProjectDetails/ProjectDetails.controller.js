const PROJECTDETAILS = require("./ProjectDetails.model");
const fs = require("fs");
const path = require("path");

// PersonalDetails
exports.getProjectDetails = async function (req, res, next) {
  try {
    let data = await PROJECTDETAILS.find({ userId: req.userId });

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

exports.updateProjectDetails = async function (req, res, next) {
  try {
    let updateId = req.params.updateId;
    let data;
    let message = "";

    if (!updateId) {
      if (!req.body.title) {
        if (req.files && req.files.images && req.files.images.length) {
          req.files.images.map((el) => {
            let oldPath = path.join(
              __dirname,
              "..",
              path.join("public", "images", el.filename)
            );
            if (fs.existsSync(oldPath)) {
              fs.unlinkSync(
                path.join(
                  __dirname,
                  "..",
                  path.join("public", "images", el.filename)
                )
              );
            }
          });
        }
        throw new Error("Please enter valid title");
      }
      let images = [];
      if (req.files && req.files.images && req.files.images.length) {
        req.files.images.map((el) => {
          return images.push(el.filename);
        });
      }
      data = await PROJECTDETAILS.create({
        ...req.body,
        images,
        userId: req.userId,
      });
      message = "Data add successfull";
    } else {
      let updateData = { ...req.body };
      let images = [];
      if (req.files && req.files.images && req.files.images.length) {
        req.files.images.map((el) => {
          return images.push(el.filename);
        });
        updateData.images = images;
      }

      Object.keys(updateData).map((key) => {
        if (!updateData[key]) {
          delete updateData[key];
        }
      });

      let oldData = await PROJECTDETAILS.findByIdAndUpdate(
        updateId,
        updateData
      );

      // if (req.files && req.files.images && req.files.images.length) {
      //   oldData.images.map((el) => {
      //     let oldPath = path.join(
      //       __dirname,
      //       "..",
      //       path.join("public", "images", el)
      //     );
      //     if (fs.existsSync(oldPath)) {
      //       fs.unlinkSync(
      //         path.join(__dirname, "..", path.join("public", "images", el))
      //       );
      //     }
      //   });
      // }

      data = await PROJECTDETAILS.findById(updateId);
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

exports.removeProjectDetails = async function (req, res, next) {
  try {
    let removeId = req.params.removeId;
    let oldData = await PROJECTDETAILS.findByIdAndDelete(removeId);
    if (oldData && oldData.images && oldData.images.length) {
      oldData.images.map((el) => {
        let oldPath = path.join(
          __dirname,
          "..",
          path.join("public", "images", el)
        );
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(
            path.join(__dirname, "..", path.join("public", "images", el))
          );
        }
      });
    }
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
