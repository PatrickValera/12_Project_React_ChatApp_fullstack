import express from 'express'
const router = express.Router()
import Message from '../models/messageModel.js'

router.get('/:roomName', async function (req, res) {
    const { roomName } = req.params
    let data = await Message.find({ room: roomName })
    res.json(data)
    res.end()
})
router.post('/global', function (req, res) {
    const { text, sender, toRoom, icon } = req.body
    req.app.io.to(toRoom).emit("getMessage", {
        text,
        sender,
        icon
    });
    let msg = new Message({
        sender: sender,
        text: text,
        room: toRoom,
        icon: icon
    })

    msg.save(error => {
        if (error) {
            console.log(errror)
            res.sendStatus(500)
        }
    })
    res.end()
})

export default router