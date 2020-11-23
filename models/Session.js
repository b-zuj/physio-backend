const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sessionSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    client: {
      type: Schema.Types.ObjectId,
      ref: "Client",
    },
    pro: {
      type: Schema.Types.ObjectId,
      ref: "Pro",
    },
    exercises: [
      {
        exercise: {
          type: Schema.Types.ObjectId,
          ref: "Exercise",
        },
        comment: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pro", sessionSchema);
