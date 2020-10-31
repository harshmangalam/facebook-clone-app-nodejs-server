module.exports = (post) => {
  return {
    id: post.id,
    content: post.content,
    body: {
      feelings: post.body.feelings,
      with: post.body.with.map((user) => ({
        id: user._id,
        name: user.name,
      })),
      at: post.body.at,
      date: post.body.date,
    },
    image: post.image,
    isProfilePost: post.isProfilePost,
    profilePostData: post.profilePostData,
    privacy: post.privacy,
    createdAt: post.createdAt,
    likes: post.likes,
    user: {
      id: post.user._id,
      name: post.user.name,
      active: post.user.active,
      profile_pic: post.user.profile_pic,
    },
  }
}
