const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const professionalDetailsSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "user" },
  Profession: {
    type: String,
    required: [true, "Please enter Profession"],
  },
  Qualification: {
    type: String,
    required: [true, "Please enter Qualification"],
  },
  languageKnown: [
    {
      type: String,
      required: [true, "Please select language"],
    },
  ],
  yearsOfExperience: {
    type: Number,
    required: [true, "Please enter years of experience"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  UpdatedAt: {
    type: Date,
    default: Date.now(),
  },
});

professionalDetailsSchema.set("toObject", { virtuals: true });
professionalDetailsSchema.set("toJSON", { virtuals: true });

const PROFESSIONALDETAILS = mongoose.model(
  "professionalDetails",
  professionalDetailsSchema
);

module.exports = PROFESSIONALDETAILS;
