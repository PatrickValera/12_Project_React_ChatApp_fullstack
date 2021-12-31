import { Box, Button, Paper } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'

const Chat = () => {
    const [messages, setMessages] = useState(['hello', 'hello2', 'hello3'])
    const [msg, setMsg] = useState("")
    const msgsContainer=useRef()

    const submitMsg = () => {
        setMessages(state => [...state, msg])
        setMsg('')
    }
    const handleEnter = (e) => {
        if (e.key === 'Enter') submitMsg()
    }
    useEffect(() => {
        msgsContainer.current.scrollTop=msgsContainer.current.scrollHeight

    }, [msg])
    return (
        <Box display='flex' sx={{height:'100vh', p: 4, backgroundColor: 'primary.dark', height: '100%', position: 'relative',flexDirection:'column' }}>
            <Box sx={{flexGrow:'1', height:'1px'}}>
                <Box ref={msgsContainer} display='flex' sx={{height:'100%',overflow:'auto', flexDirection:'column',alignItems:'flex-start'}}>
                    {messages.map((item) => (
                        <Paper sx={{ p: 1, mb: 1, color: 'white'}}>
                            {item}
                        </Paper>
                    ))}
                </Box>
            </Box>
            <Box display='flex' sx={{ p: 2 }}>
                <input className='message-input' placeholder='Message' autoComplete='off' value={msg} onChange={(e) => setMsg(e.target.value)} onKeyPress={handleEnter}></input>
                <Button variant='contained' color='secondary' disableElevation disableRipple onClick={submitMsg}>Send</Button>
            </Box>

        </Box>
    )
}

export default Chat
