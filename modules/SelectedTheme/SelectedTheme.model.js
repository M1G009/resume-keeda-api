const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SelectedThemeSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "user" },
    theme: { type: Schema.Types.ObjectId, ref: "Theme" },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

SelectedThemeSchema.set("toObject", { virtuals: true });
SelectedThemeSchema.set("toJSON", { virtuals: true });

const SelectedTheme = mongoose.model("SelectedTheme", SelectedThemeSchema);

module.exports = SelectedTheme;
