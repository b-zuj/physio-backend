const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clientSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    pro: {
      type: Schema.Types.ObjectId,
      ref: "Pro",
    },
    sessions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Session",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Client", clientSchema);
