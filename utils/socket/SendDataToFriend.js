const User = require("../../models/User")


module.exports = async ({ req, key, data }) => {
    const friend = await User.findById(req.userId).populate("friends")
    friend.friends.forEach(user => {
      if (user.socketId) {
        req.io.to(user.socketId).emit(key, { data })
      }
    })
  }