const User = require('../../models/User')
const FriendRequest = require('../../models/FriendRequest')
const filterUserData = require('../../utils/FilterUserData')
const FilterUserData = require('../../utils/FilterUserData')

exports.fetchUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.user_id)
    const userData = filterUserData(user)
    res.status(200).json({ user: userData })
  } catch (err) {
    console.log(err)
  }
}

exports.fetchRecommandedUsers = async (req, res) => {
  try {
    const users = await User.find().where('_id').ne(req.userId)

    const usersData = users.map((user) => {
      return filterUserData(user)
    })
    res.status(200).json({ users: usersData })
  } catch (err) {
    console.log(err)
  }
}
exports.me = async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate('friends')
    if(!user){
      return res.status(404).json({error:"user not found"})
    }

    const userData = filterUserData(user)

    const friends = user.friends.map((friend) => {
      return {
        ...FilterUserData(friend),
      }
    })

    userData.friends = friends

    res.status(200).json({ user: userData })
  } catch (err) {
    console.log(err)
  }
}

exports.fetchIncommingFriendRequest = async (req, res) => {
  try {
    const friends = await FriendRequest.find({
      $and: [{ isAccepted: false }, { receiver: req.userId }],
    }).populate('sender', '_id name profile_pic active')

    const friendsData = friends.map((friend) => {
      return {
        id: friend.id,
        user: FilterUserData(friend.sender),
      }
    })

    res.status(200).json({ friends: friendsData })
  } catch (err) {
    console.log(err)
  }
}

exports.fetchSendedFriendRequest = async (req, res) => {
  try {
    const friends = await FriendRequest.find({
      $and: [{ isAccepted: false }, { sender: req.userId }],
    }).populate('receiver')
    const friendsData = friends.map((friend) => {
      return {
        id: friend.id,
        user: FilterUserData(friend.receiver),
      }
    })

    res.status(200).json({ friends: friendsData })
  } catch (err) {
    console.log(err)
  }
}
