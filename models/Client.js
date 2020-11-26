<<<<<<< HEAD
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const passportLocalMongoose = require('passport-local-mongoose');
=======
>>>>>>> e1dadcb413ca606326abbed9927c5780a30fcc40
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

<<<<<<< HEAD
=======
const { Schema } = mongoose;

>>>>>>> e1dadcb413ca606326abbed9927c5780a30fcc40
const jwtPrivateSecret = process.env.JWT_PRIVATE_SECRET.replace(/\\n/gm, '\n');

const clientSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      validate: [validator.isEmail, 'Please provide a valid email address'],
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'password is required'],
      minlength: 8,
    },
    userType: {
      type: String,
      required: true,
      default: 'client',
    },
    pro: {
      type: Schema.Types.ObjectId,
      ref: 'Pro',
<<<<<<< HEAD
=======
    },
    comment: {
      type: String,
>>>>>>> e1dadcb413ca606326abbed9927c5780a30fcc40
    },
    sessions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Session',
      },
    ],
  },
  { timestamps: true },
);

<<<<<<< HEAD
clientSchema.pre('save', async function (next) {
=======
clientSchema.pre('save', async next => {
>>>>>>> e1dadcb413ca606326abbed9927c5780a30fcc40
  if (!this.password || !this.isModified('password')) return next;
  this.password = await bcrypt.hash(this.password, parseInt(process.env.HASH));
  return next();
});

clientSchema.methods.toJSON = () => {
  const user = this;
  const userObj = user.toObject();
  delete userObj.password;
  return userObj;
};

clientSchema.methods.comparePassword = async password => bcrypt.compare(password, this.password);

<<<<<<< HEAD
clientSchema.methods.generateVerificationToken = function () {
  return jwt.sign({ id: this._id }, jwtPrivateSecret, {
    expiresIn: '2h',
    algorithm: 'RS256',
  });
};
=======
clientSchema.methods.generateVerificationToken = () => jwt.sign(
  { id: this._id },
  jwtPrivateSecret, {
    expiresIn: '2h',
    algorithm: 'RS256',
  },
);
>>>>>>> e1dadcb413ca606326abbed9927c5780a30fcc40

clientSchema.statics.checkExistingField = async (field, value) => {
  const checkField = await Client.findOne({ [`${field}`]: value });
  return checkField;
};

const Client = mongoose.model('Client', clientSchema);
// clientSchema.plugin(passportLocalMongoose);

module.exports = Client;
