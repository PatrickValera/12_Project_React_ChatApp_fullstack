const express = require('express')
const path = require('path')
const app=express()

const __dirname1=path.resolve()

    app.use(express.static(path.join(__dirname1,'/frontend/build')))
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname1,'frontend','build','index.html'))
    })

app.listen(process.env.PORT||5000,console.log('SERVER RUNNING'))