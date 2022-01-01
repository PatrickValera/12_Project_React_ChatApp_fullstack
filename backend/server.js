import express from 'express'
import colors from 'colors'
import path from 'path'
import dotenv from 'dotenv'
import connectDB from './config/dataBase.js' 
import userRoutes from './routes/userRoutes.js'
import roomRoutes from './routes/roomRoutes.js'

const __dirname1 = path.resolve()

// CREATE EXPRESS APP
const app = express()

//Global env variables
dotenv.config()

// Connect to database
connectDB()

//To access the req body json
app.use(express.json())

// Attack io to response
app.use((req,res,next)=>{
    req.io=io
    next()
})

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

app.listen(process.env.PORT || 5000, console.log('SERVER RUNNING'))