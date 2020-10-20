const Post = require('../../models/Post')
const Comment = require('../../models/Comment')
const FilterPostData = require('../../utils/FilterPostData')

exports.fetchPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId)
      .populate('user')
      .populate({ path: 'body.with', select: '_id name' })

    let postData = FilterPostData(post)

    res.status(200).json({ post: postData })
  } catch (err) {
    console.log(err)
  }
}

exports.fetchAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate('user')
      .populate({ path: 'body.with', select: '_id name' })

    let postsData = posts.map((post) => FilterPostData(post))
    res.status(200).json({ posts: postsData })
  } catch (err) {
    console.log(err)
  }
}
