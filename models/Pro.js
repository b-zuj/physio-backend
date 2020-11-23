const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const proSchema = new Schema(
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
    clients: [
      {
        type: Schema.Types.ObjectId,
        ref: "Client",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pro", proSchema);

// Name, Address, Contact, Status, Some document
// Ref Clients:  [ {  __Client__ }, {  __Client__ }, {  __Client__ }]
