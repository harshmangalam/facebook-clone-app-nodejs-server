const router = require('express').Router()
const {
  me,
  fetchUserById,
  fetchRecommandedUsers,
  fetchSendedFriendRequest,
  fetchIncommingFriendRequest,
  searchUsers
} = require('../controllers/User/FetchUser')

const {
  sendMessageToFriend,
  getFriendMessages,
} = require('../controllers/User/Chat')
const {
  sendFriendRequest,
  acceptFriendRequest,
  declineFriendRequest,
  cancelSendedFriendRequest,
  updateProfilePic,
  updateCoverPic,
  updateProfile,
  clearNotification,
} = require('../controllers/User/UserAction')
const authRequired = require('../middleware/AuthRequired')

router.get('/me', authRequired, me)
router.get('/recommanded_users', authRequired, fetchRecommandedUsers)
router.get('/friend_request/sended', authRequired, fetchSendedFriendRequest)
router.get(
  '/friend_request/received',
  authRequired,
  fetchIncommingFriendRequest,
)

router.get('/search', searchUsers)
router.get('/friend_request/:userId/send', authRequired, sendFriendRequest)
router.get(
  '/friend_request/:requestId/accept',
  authRequired,
  acceptFriendRequest,
)
router.get(
  '/friend_request/:requestId/decline',
  authRequired,
  declineFriendRequest,
)
router.get(
  '/friend_request/:requestId/cancel',
  authRequired,
  cancelSendedFriendRequest,
)
router.get('/:user_id', authRequired, fetchUserById)

router.post('/chat/:friendId/send', authRequired, sendMessageToFriend)
router.get('/chat/:friendId/get_messages', authRequired, getFriendMessages)

router.put('/profile_pic/update', authRequired, updateProfilePic)
router.put('/cover_pic/update', authRequired, updateCoverPic)
router.put('/update_profile/:input', authRequired, updateProfile)
router.delete('/notifications/clear', authRequired, clearNotification)

module.exports = router
