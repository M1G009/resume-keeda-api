const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "user" },
  title: {
    type: String,
    required: [true, "Please enter project title"],
  },
  images: [String],
  url: {
    type: String,
  },
  description: {
    type: String,
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

projectSchema.set("toObject", { virtuals: true });
projectSchema.set("toJSON", { virtuals: true });

const PROJECT = mongoose.model("project", projectSchema);

module.exports = PROJECT;
