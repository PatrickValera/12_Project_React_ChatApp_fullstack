import express from 'express'
import colors from 'colors'
import path from 'path'
import dotenv from 'dotenv'
import connectDB from './config/dataBase.js'
import userRoutes from './routes/userRoutes.js'
const __dirname1 = path.resolve()

// CREATE EXPRESS APP
const app = express()
//Global env variables
dotenv.config()
// Connect to database
connectDB()
//To access the req body json
app.use(express.json())

// SERVE BUILD FILES TO CLIENT
app.use(express.static(path.join(__dirname1, '/frontend/build')))
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname1, 'frontend', 'build', 'index.html'))
})

// ROUTES HERE
app.use('/api/users',userRoutes)


app.listen(process.env.PORT || 5000, console.log('SERVER RUNNING'))