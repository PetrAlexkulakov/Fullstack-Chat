const express = require('express');
const app = express();
const http = require('http');
const {Server} = require('socket.io')
const cors = require("cors")
require("dotenv").config()

app.use(express.json())
app.use(cors())
const server = http.createServer(app)

const db = require('./models')

const messagesRouter = require('./routes/Messages')
app.use("/messages", messagesRouter)

const io = new Server(server, {
    cors: {
        methods: ["GET", "POST"]
    }
})

io.on("connection", (socket) => {
    socket.on("send_message", (data) => {
        io.emit("receive_message", data)
        // socket.broadcast.emit("receive_message", data)
    })
})

db.sequelize.sync().then(() => {
    server.listen(process.env.PORT || 3001, () => {
        console.log('Server is running')
    })
}).catch((err) => {
    console.error(err)
})
    