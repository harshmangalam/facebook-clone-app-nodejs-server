module.exports = (user) => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    profile_pic: user.profile_pic,
    cover_image: user.cover_image,
    bio: user.bio,
    location: user.location,
    education: user.education,
    active: user.active,
    createdAt: user.createdAt,
    friends: user.friends.map((friend) => ({
      id: friend._id,
      name:friend.name
    })),
  }
}
