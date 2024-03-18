const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const skillsSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "user" },
    name: {
      type: String,
      required: [true, "Please enter skill name"],
    },
    rate: {
      type: Number,
      min: 1,
      max: 10,
      required: [true, "Please enter rate"],
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

skillsSchema.set("toObject", { virtuals: true });
skillsSchema.set("toJSON", { virtuals: true });

const SKILLS = mongoose.model("skills", skillsSchema);

module.exports = SKILLS;
