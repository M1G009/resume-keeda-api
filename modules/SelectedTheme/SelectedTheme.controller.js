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

exports.getSlugTheme = async function (req, res, next) {
  try {
    const userData = await SelectedTheme.aggregate([
      { $match: { slug: req.params.slug } },
      {
        $lookup: {
          from: "educationsdetails",
          localField: "user",
          foreignField: "userId",
          as: "educationsdetails",
        },
      },
      {
        $lookup: {
          from: "awardsandcertificates",
          localField: "user",
          foreignField: "userId",
          as: "awardsandcertificates",
        },
      },
      {
        $lookup: {
          from: "personaldetails",
          localField: "user",
          foreignField: "userId",
          as: "personaldetail",
        },
      },
      {
        $lookup: {
          from: "professionaldetails",
          localField: "user",
          foreignField: "userId",
          as: "professionaldetail",
        },
      },
      {
        $lookup: {
          from: "projects",
          localField: "user",
          foreignField: "userId",
          as: "projects",
        },
      },
      {
        $lookup: {
          from: "skills",
          localField: "user",
          foreignField: "userId",
          as: "skills",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "userId",
          as: "users",
        },
      },
      {
        $lookup: {
          from: "workexperiences",
          localField: "user",
          foreignField: "userId",
          as: "workexperiences",
        },
      },
      {
        $lookup: {
          from: "themes",
          localField: "theme",
          foreignField: "_id",
          as: "theme",
        },
      },
    ]);

    // Since aggregate returns an array, we extract the first element (if any)
    const UserDetails = userData[0] || null;

    // If UserDetails exists and education is an array, extract the first element
    if (
      UserDetails &&
      Array.isArray(UserDetails.personaldetail) &&
      UserDetails.personaldetail.length > 0
    ) {
      UserDetails.personaldetail = UserDetails.personaldetail[0];
    }

    if (
      UserDetails &&
      Array.isArray(UserDetails.professionaldetail) &&
      UserDetails.professionaldetail.length > 0
    ) {
      UserDetails.professionaldetail = UserDetails.professionaldetail[0];
    }

    if (
      UserDetails &&
      Array.isArray(UserDetails.users) &&
      UserDetails.users.length > 0
    ) {
      UserDetails.users = UserDetails.users[0];
    }

    if (
      UserDetails &&
      Array.isArray(UserDetails.theme) &&
      UserDetails.theme.length > 0
    ) {
      UserDetails.theme = UserDetails.theme[0];
    }

    res.status(200).json({
      status: "success",
      message: "Data found successfull",
      data: UserDetails,
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

exports.createUpdateThemeSelect = async function (req, res, next) {
  try {
    await SelectedTheme.findOneAndUpdate(
      {
        user: req.userId,
      },
      {
        user: req.userId,
        theme: req.body.theme,
        slug: req.body.slug,
      },
      { upsert: true, new: true }
    );

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
