const mongoose = require('mongoose');
const validator = require('validator');

const { Schema } = mongoose;

const inviteSchema = new Schema(
  {
    email: {
      type: String,
      validate: [validator.isEmail, 'Please provide a valid email address'],
      required: true,
    },
    pro: {
      type: Schema.Types.ObjectId,
      ref: 'Pro',
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Invite', inviteSchema);
