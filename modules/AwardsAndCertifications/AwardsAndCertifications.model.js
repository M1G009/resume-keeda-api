const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const awardsAndCertificateSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "user" },
  title: {
    type: String,
    required: [true, "Please enter title"],
  },
  provider: {
    type: String,
    required: [true, "Please enter provider name"],
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

awardsAndCertificateSchema.set("toObject", { virtuals: true });
awardsAndCertificateSchema.set("toJSON", { virtuals: true });

const AWARDANDCERTIFICATE = mongoose.model(
  "awardsAndCertificates",
  awardsAndCertificateSchema
);

module.exports = AWARDANDCERTIFICATE;
