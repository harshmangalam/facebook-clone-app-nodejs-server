const { Schema, model } = require('mongoose')

const commentSchema = new Schema({
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  body: {
    image: String,
    text: {
      type: String,
      trim: true,
    },
  },

  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
})

module.exports = model('Comment', commentSchema)
