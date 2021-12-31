import { Box, Paper } from '@mui/material'
import React from 'react'

const Chat = () => {
    return (
        <Box sx={{p:4, backgroundColor:'primary.dark',height:'100%'}}>
            {['one','two','three'].map((item)=>(
                <Paper sx={{p:1,mb:1, color:'white'}}>
                    {item}
                </Paper>
            ))}
        </Box>
    )
}

export default Chat
