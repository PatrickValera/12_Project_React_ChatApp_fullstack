import express from 'express'
const router = express.Router()

router.get('/global',function(req,res){
    res.io.on('connection',(socket)=>{
        console.log('CONNECTED')
    })
})

export default router