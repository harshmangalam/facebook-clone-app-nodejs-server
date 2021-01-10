const Chat = require('../../models/Chat')
const User = require('../../models/User')
const FilterUserData = require('../../utils/FilterUserData')

exports.sendMessageToFriend = async (req, res) => {
  const { text, image } = req.body

  if (!text && !image) {
    return res
      .status(422)
      .json({ error: 'Don`t send empty message type something' })
  }
  try {
    const friend = await User.findById(req.params.friendId)
    if (!friend) {
      return res.status(404).json({ error: 'Friend Not Found' })
    }

    const chat = new Chat({
      sender: req.userId,
      receiver: req.params.friendId,
      body: {
        text: text || '',
        image: image || '',
      },
    })

    const saveChat = await chat.save()

    const getChat = await Chat.findById(saveChat.id)
      .populate('sender')
      .populate('receiver')
    const chatdata = {
      id: saveChat.id,
      sender: FilterUserData(getChat.sender),
      receiver: FilterUserData(getChat.receiver),
      body: getChat.body,
      createdAt: getChat.createdAt,
    }
    res.status(201).json({ data: chatdata })
    if (getChat.receiver.socketId) {
      req.io
        .to(getChat.receiver.socketId)
        .emit('new-message', { data: chatdata })
    }
  } catch (err) {
    console.log(err)
    return res.status(500).json({error:"Something went wrong"})
  }
}

exports.getFriendMessages = async (req, res) => {
  try {
    const messages = await Chat.find({
      $or: [
        { sender: req.userId, receiver: req.params.friendId },
        { receiver: req.userId, sender: req.params.friendId },
      ],
    })
      .populate('sender')
      .populate('receiver')

    const messagesData = messages.map((message) => {
      return {
        id: message.id,
        sender: FilterUserData(message.sender),
        receiver: FilterUserData(message.receiver),
        body:message.body,
        createdAt: message.createdAt,

      }
    })

    res.status(200).json({ data: messagesData })
  } catch (err) {
    console.log(err)
    return res.status(500).json({error:"Something went wrong"})
  }
}
