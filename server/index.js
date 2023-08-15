const express = require('express');
const app = express();
const http = require('http');
const {Server} = require('socket.io')
const cors = require("cors")

app.use(cors())
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        methods: ["GET", "POST"]
    }
})

io.on("connection", (socket) => {
    socket.on("send_message", (data) => {
        socket.broadcast.emit("receive_message", data)
    })
})

server.listen(3001, () => {
    console.log('Server is running')
})