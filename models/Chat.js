const { Schema, model } = require('mongoose')

const chatSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    body: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true },
)

module.exports = model('Chat', chatSchema)
