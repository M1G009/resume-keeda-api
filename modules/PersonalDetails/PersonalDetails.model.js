const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const personalDetailsSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "user" },
    userProfileImage: {
      type: String,
      required: [true, "Please upload profile image"],
    },
    mobileNumber: {
      type: String,
      required: [true, "Please enter mobile number"],
    },
    DOB: {
      type: Date,
      required: [true, "Please enter date of birth"],
    },
    gender: {
      type: String,
      required: [true, "Please select gender"],
      enum: ["Male", "Female", "Other"],
    },
    Address: {
      type: String,
      required: [true, "Please enter address"],
    },
    pincode: {
      type: String,
      required: [true, "Please enter pincode"],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    UpdatedAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

personalDetailsSchema.set("toObject", { virtuals: true });
personalDetailsSchema.set("toJSON", { virtuals: true });

const PERSONALDETAILS = mongoose.model(
  "personalDetails",
  personalDetailsSchema
);

module.exports = PERSONALDETAILS;
