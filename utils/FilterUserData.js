module.exports = (user) => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    profile_pic: user.profile_pic,
    bio: user.bio,
    active: user.active,
    createdAt: user.createdAt,
  }
}
