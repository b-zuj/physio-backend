const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const exerciseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    media: String,
    duration: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Exercise", exerciseSchema);