const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const educationsDetailsSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "user" },
    degree: {
      type: String,
      required: [true, "Please enter degree"],
    },
    school: {
      type: String,
      required: [true, "Please enter school"],
    },
    grade: {
      type: String,
      required: [true, "Please enter grade or number"],
    },
    passingYear: {
      type: Number,
      required: [true, "Please select passing year"],
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

educationsDetailsSchema.set("toObject", { virtuals: true });
educationsDetailsSchema.set("toJSON", { virtuals: true });

const EDUCATIONSDETAILS = mongoose.model(
  "educationsDetails",
  educationsDetailsSchema
);

module.exports = EDUCATIONSDETAILS;
