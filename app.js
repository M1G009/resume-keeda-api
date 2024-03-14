var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
var cors = require("cors");
require("dotenv").config();
/**
 * Get port from environment and store in Express.
 */

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log(err.message);
  });

var indexRouter = require("./routes/index");
var userRouter = require("./modules/User/User.route");
var adminRouter = require("./modules/admin/Admin.route");
var ThemeRouter = require("./modules/Theme/Theme.route");
var SelectedThemeRouter = require("./modules/SelectedTheme/SelectedTheme.route");

var AwardsAndCertificationsRouter = require("./modules/AwardsAndCertifications/AwardsAndCertifications.route");
var EducationsDetailsRouter = require("./modules/EducationsDetails/EducationsDetails.route");
var PersonalDetailsRouter = require("./modules/PersonalDetails/PersonalDetails.route");
var ProfessionalDetailsRouter = require("./modules/ProfessionalDetails/ProfessionalDetails.route");
var ProjectDetailsRouter = require("./modules/ProjectDetails/ProjectDetails.route");
var SkillsRouter = require("./modules/Skills/Skills.route");
var WorkExperienceRouter = require("./modules/WorkExperience/WorkExperience.route");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(
  cors({
    origin: "*",
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/theme", ThemeRouter);
app.use("/api/v1/themeselect", SelectedThemeRouter);

app.use("/api/v1/awardsandcertification", AwardsAndCertificationsRouter);
app.use("/api/v1/educationsdetails", EducationsDetailsRouter);
app.use("/api/v1/personaldetails", PersonalDetailsRouter);
app.use("/api/v1/professionaldetails", ProfessionalDetailsRouter);
app.use("/api/v1/projects", ProjectDetailsRouter);
app.use("/api/v1/skills", SkillsRouter);
app.use("/api/v1/workexperience", WorkExperienceRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
