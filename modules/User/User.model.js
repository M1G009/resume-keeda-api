const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please enter first name"],
    },
    lastName: {
      type: String,
      required: [true, "Please enter last name"],
    },
    email: {
      type: String,
      required: [true, "Please enter email"],
      unique: [true, "Email is already exist"],
    },
    password: {
      type: String,
      required: [true, "Please enter password"],
    },
    status: {
      type: String,
      enum: ["Active", "Pending", "Block"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

userSchema.set("toObject", { virtuals: true });
userSchema.set("toJSON", { virtuals: true });

const USER = mongoose.model("user", userSchema);

module.exports = USER;
