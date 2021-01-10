const User = require('../../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const ValidateEmail = require('../../utils/ValidateEmail')
const {JWT_SECRET,JWT_EXP} = require("../../config")

module.exports = async (req, res) => {
  const { email, password } = req.body
  let error = {}

  if (!ValidateEmail(email)) {
    error.email = 'email address should be valid '
  }
  if (!email || email.trim().length === 0) {
    error.email = 'email field must be required'
  }

  if (!password || password.trim().length === 0) {
    error.password = 'password must be required'
  }

  if (Object.keys(error).length) {
    return res.status(422).json({ error })
  }

  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ error: 'email not found' })
    }

    const verifyPassword = await bcrypt.compare(password, user.password)
    if (!verifyPassword) {
      return res.status(400).json({ error: 'password is incorrect' })
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: JWT_EXP,
    })

    user.active = true
    await user.save()


    return res.status(201).json({
      message: 'login successfully',
      data: {
        token,
      }
    })
  } catch (err) {
    console.log(err)
    return res.status(500).json({error:"Something went wrong"})
  }
}
