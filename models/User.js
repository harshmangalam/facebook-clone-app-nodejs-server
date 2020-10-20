const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },

    profile_pic: {
      type: String,
      default: '',
    },

    bio: {
      type: String,
      default: '',
      trim: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
    socketId: {
      type: String,
      default: '',
    },
    jwtToken: [String],

    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },

  { timestamps: true },
)

module.exports = mongoose.model('User', UserSchema)
