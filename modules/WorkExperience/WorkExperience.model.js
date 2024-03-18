const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workExperienceSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "user" },
    companyName: {
      type: String,
      required: [true, "Please enter company name"],
    },
    title: {
      type: String,
      required: [true, "Please enter job title"],
    },
    startDate: {
      type: Date,
      required: [true, "Please enter start date"],
    },
    endDate: {
      type: Date,
      required: [true, "Please enter end date"],
    },
    description: {
      type: String,
      required: [true, "Please enter description"],
    },
  },
  { timestamps: true }
);

workExperienceSchema.set("toObject", { virtuals: true });
workExperienceSchema.set("toJSON", { virtuals: true });

const WORKEXPERIENCE = mongoose.model("workExperience", workExperienceSchema);

module.exports = WORKEXPERIENCE;
