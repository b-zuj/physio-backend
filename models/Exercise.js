const mongoose = require('mongoose');

const { Schema } = mongoose;

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
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'Pro',
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Exercise', exerciseSchema);
