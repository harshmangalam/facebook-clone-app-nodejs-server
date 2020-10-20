const router = require('express').Router()
const {
  createComment,
  fetchComments,
  likeDislikeComment,
  createReply
} = require('../controllers/Post/Comment')
const {
  fetchAllPosts,
  fetchPostById,
} = require('../controllers/Post/FetchPost')
const {
  createPost,
  likeDislikePost,
} = require('../controllers/Post/postAction')
const authRequired = require('../middleware/AuthRequired')

router.post('/', authRequired, createPost)
router.get('/', authRequired, fetchAllPosts)
router.get('/:postId', authRequired, fetchPostById)

router.get('/comment/:commentId/like_dislike', authRequired, likeDislikeComment)

router.get('/:postId/like_dislike', authRequired, likeDislikePost)
router.get('/:postId/comment', authRequired, fetchComments)
router.post('/:postId/comment', authRequired, createComment)

module.exports = router
