import express from 'express'
const router = express.Router()
import Message from '../models/messageModel.js'
router.get('/global',function(req,res){
    // res.io.on('connection',(socket)=>{
    //     console.log('CONNECTED')
    // })
    console.log('req.app.iwfeewfewfo.emit')

})
router.post('/global',function(req,res){
    const {text,sender,toRoom}=req.body
    let msg=new Message({
        sender:sender,
        text:text,
        room:toRoom
    })
    req.app.io.to(toRoom).emit("getMessage", {
        text,
        sender
    });
    msg.save(error=>{
        if(error){
            console.log(errror)
            res.sendStatus(500)
        }
    })
    res.end()
})

export default router