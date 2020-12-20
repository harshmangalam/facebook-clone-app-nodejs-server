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

    cover_image: {
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

    location: {
      type: Object,
    },
    education: {
      type: String,
      trim: true,
    },

    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },

  { timestamps: true },
)

UserSchema.index({ name: 'text', email: 'text'})
module.exports = mongoose.model('User', UserSchema)
