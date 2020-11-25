const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const passportLocalMongoose = require('passport-local-mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

const jwtPrivateSecret = process.env.JWT_PRIVATE_SECRET.replace(/\\n/gm, "\n");

const clientSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      validate: [validator.isEmail, "Please provide a valid email address"],
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minlength: 8,
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

clientSchema.pre("save", async function (next) {
  if (!this.password || !this.isModified("password")) return next;
  this.password = await bcrypt.hash(this.password, parseInt(process.env.HASH));
  next();
});

clientSchema.methods.toJSON = function () {
  const user = this;
  const userObj = user.toObject();
  delete userObj.password;
  return userObj;
};

clientSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

clientSchema.methods.generateVerificationToken = function () {
  return jwt.sign({ id: this._id }, jwtPrivateSecret, {
    expiresIn: "2h",
    algorithm: "RS256",
  });
};

clientSchema.statics.checkExistingField = async (field, value) => {
  const checkField = await Client.findOne({ [`${field}`]: value });
  return checkField;
};

// clientSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Client", clientSchema);
