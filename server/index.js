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

const messagesRouter = require('./routes/Messages');
const Tags = require('./models/Tags');
app.use("/messages", messagesRouter)

const io = new Server(server, {
    cors: {
        methods: ["GET", "POST"]
    }
})

io.on("connection", async (socket) => {
    socket.on("send_tags", async (data) => {
        const sendTags = data.tags.split(';');
        
        let messages
        if (data.tags !== '') {
            messages = (await db.Messages.findAll({
                include: [{
                    model: db.Tags,
                    where: {
                        tagName: {
                            [db.Sequelize.Op.in]: sendTags
                        }
                    }
                }]
            })).concat((await db.Messages.findAll())
            .filter((message) => findAllTags(message.dataValues.message).length === 0));
        } else {
            messages = (await db.Messages.findAll())
                .filter((message) => findAllTags(message.dataValues.message).length === 0);
        }
        socket.emit("receive_messages", messages);
    })

    socket.on("send_message", async (data) => {
        const newMessage = await db.Messages.create({
            message: data.message
        });
        const tags = findAllTags(data.message)
        tags.forEach(async (tag) => {
            const dbTag = await db.Tags.findOne({ where: { tagName: tag }})
            if (!dbTag){
                const newTag = await db.Tags.create({
                    tagName: tag
                })
                await db.MessageTag.create({
                    messageId: newMessage.id,
                    tagId: newTag.id
                })
            } else {
                await db.MessageTag.create({
                    messageId: newMessage.id,
                    tagId: dbTag.id
                })
            }
        })
        io.emit("receive_message", data)
    })
})

db.sequelize.sync().then(() => {
    server.listen(process.env.PORT || 3001, () => {
        console.log('Server is running')
    })
}).catch((err) => {
    console.error(err)
})

function findAllTags(text) {
    const regex = /#(\w+)/g;
    const tags = [];
    let match;

    while ((match = regex.exec(text))) {
        tags.push(match[1]);
    }

    return tags
}
    