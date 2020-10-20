const mongoose = require('mongoose')

const Schema = mongoose.Schema

const FriendRequestSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    isAccepted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
)

module.exports = mongoose.model('FriendRequest', FriendRequestSchema)
