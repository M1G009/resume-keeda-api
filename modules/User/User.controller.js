const USER = require("./User.model");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

exports.secure = async function (req, res, next) {
  try {
    if (!req.headers.authorization) {
      throw new Error("Token not found");
    }

    let token = req.headers.authorization;

    let checkToken = jwt.verify(token, process.env.SECRET_KEY);
    console.log(checkToken);
    if (!checkToken || !checkToken.id) {
      throw new Error("Token is not valid");
    }

    let checkUser = await USER.findById(checkToken.id);

    if (!checkUser) {
      throw new Error("User not found");
    }
    req.userId = checkToken.id;
    next();
  } catch (err) {
    res.status(401).json({
      status: "fail",
      message: err.message,
    });
  }
};

const createToken = (userId) => {
  let token = jwt.sign({ id: userId }, process.env.SECRET_KEY);
  return token;
};

// email varification is pending
exports.UserCreate = async function (req, res, next) {
  try {
    if (
      !req.body.email ||
      !req.body.firstName ||
      !req.body.lastName ||
      !req.body.password
    ) {
      throw new Error("Please enter valid fields");
    }

    req.body.password = await bcrypt.hash(req.body.password, 10);

    let newUser = await USER.create(req.body);

    res.status(200).json({
      status: "success",
      message: "User create successful",
      data: newUser,
      token: createToken(newUser._id),
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.login = async function (req, res, next) {
  try {
    if (!req.body.email || !req.body.password) {
      throw new Error("Please enter valid fields");
    }

    let checkUser = await USER.findOne({ email: req.body.email });
    if (!checkUser) {
      throw new Error("User not found");
    }

    // if (checkUser.status != "Active") {
    //   throw new Error("User is not active yet");
    // }

    let checkPassword = await bcrypt.compare(
      req.body.password,
      checkUser.password
    );

    if (!checkPassword) {
      throw new Error("Please enter valid password");
    }

    res.status(200).json({
      status: "success",
      message: "User login successful",
      data: checkUser,
      token: createToken(checkUser._id),
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};
