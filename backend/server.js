import express from 'express'
import colors from 'colors'
import path from 'path'
import dotenv from 'dotenv'
import connectDB from './config/dataBase.js' 
import userRoutes from './routes/userRoutes.js'
import roomRoutes from './routes/roomRoutes.js'
import { createServer } from "http";
import { Server } from "socket.io";

const __dirname = path.resolve()

// CREATE EXPRESS APP
const app = express()
const httpServer=createServer(app)
const io = new Server(httpServer,{
    cors: {
        origin: "http://localhost:3000",
    },
})
app.io=io
io.on("connection", (socket) => {
    // console.log(socket.id)
    socket.on("sendMessage", ({ text,sender,toRoom }) => {
        io.to(toRoom).emit("getMessage", {
            text,
            sender
        });
    });
    socket.on('join-room',room=>{
        socket.join(room)
        if(room==='global')socket.leave('globalanon')
        else socket.leave('global')
    })
});

//Global env variables
dotenv.config()

// Connect to database
connectDB()

//To access the req body json
app.use(express.json())

// Attach io to response
// app.use((req,res,next)=>{
//     req.io=io
//     next()
// })

// SERVE BUILD FILES TO CLIENT
if(process.env.NODE_ENV==='production'){
    app.use(express.static(path.join(__dirname,'/frontend/build')))
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'frontend','build','index.html'))
    })
}else{
    app.get('/api',(req,res)=>{
    res.send("api")
})
}

// ROUTES HERE
app.use('/api/users',userRoutes)
app.use('/api/rooms',roomRoutes)

httpServer.listen(process.env.PORT||5000,console.log(`SERVER IS RUNNING ON PORT ${process.env.PORT}`.green.underline))
