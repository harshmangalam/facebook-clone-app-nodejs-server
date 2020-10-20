const { post } = require('../routes/Post')

module.exports = (comment) => {
  return {
    id: comment.id,
    post: comment.post,
    user: {
      id: comment.user._id,
      name: comment.user.name,
      email: comment.user.email,
      profile_pic: comment.user.profile_pic,
    },
    body: comment.body,
    likes: comment.likes,
  }
}
