const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require("dotenv").config()
const app = express()
const http = require('http')
const server = http.createServer(app)
const io = require('socket.io')(server)

const UserRoutes = require('./routes/User')
const AuthRoutes = require('./routes/Auth')
const PostRoutes = require('./routes/Post')

const PORT = process.env.PORT || 5000
const {MONGODB_URI} = require("./config")

app.use(cors())
app.use(express.json())

app.use((req, res, next) => {
  io.req = req
  req.io = io
  next()
})

app.use('/api/auth', AuthRoutes)
app.use('/api/user', UserRoutes)
app.use('/api/post', PostRoutes)

require('./socket')(io)

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('database connected')
    server.listen(PORT, () => console.log(`server started on port ${PORT}`))
  })
  .catch((err) => console.log(err))
