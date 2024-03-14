const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ThemeSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter name"],
    },
    theme: {
      type: String,
      required: [true, "Please enter image"],
    },
  },
  { timestamps: true }
);

ThemeSchema.set("toObject", { virtuals: true });
ThemeSchema.set("toJSON", { virtuals: true });

const Theme = mongoose.model("Theme", ThemeSchema);

module.exports = Theme;
