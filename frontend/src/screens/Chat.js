import { Box, Button, Paper } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { io } from "socket.io-client";
const Chat = () => {
    const [messages, setMessages] = useState(['msg disappers when refreshed'])
    const [msg, setMsg] = useState("")
    const msgsContainer = useRef()
    const socket = useRef()
    const submitMsg = () => {
        socket.current.emit('sendMessage', { text: msg })
        // setMessages(state => [...state, msg])
        setMsg('')
    }
    const handleEnter = (e) => {
        if (e.key === 'Enter') submitMsg()
    }
    useEffect(() => {
        socket.current = io("ws://localhost:5000");
        socket.current.on("getMessage", (data) => {
            console.log(data)
            setMessages(state => [...state, data.text])
        });
    }, [])
    useEffect(() => {
        msgsContainer.current.scrollTop = msgsContainer.current.scrollHeight
    }, [messages])
    return (
        <Box display='flex' sx={{ height: '100vh', p: 4, backgroundColor: 'primary.dark', height: '100%', position: 'relative', flexDirection: 'column' }}>
            <Box sx={{ flexGrow: '1', height: '1px' }}>
                <Box ref={msgsContainer} display='flex' sx={{ height: '100%', overflow: 'auto', flexDirection: 'column', alignItems: 'flex-start' }}>
                    {messages.map((item) => (
                        <Paper sx={{ p: 1, mb: 1, color: 'white' }}>
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
