import { Box, Button, Paper, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { io } from "socket.io-client";

const Chat = () => {
    let navigate = useNavigate()
    const [messages, setMessages] = useState([{ sender: 'Admin', text: 'yo' }])
    const { userInfo } = useSelector(state => state.userLogin)
    const { roomName } = useSelector(state => state.roomDetails)
    const [msg, setMsg] = useState("")
    const msgsContainer = useRef()
    const socket = useRef()

    const submitMsg = () => {
        if (!msg) return
        socket.current.emit('sendMessage', {
            text: msg,
            sender: userInfo.name,
            toRoom: roomName
        })
        setMsg('')
    }

    const handleEnter = (e) => {
        if (e.key === 'Enter') submitMsg()
    }

    useEffect(() => {
        if (!userInfo) navigate('/login')
        socket.current = io(window.location.pathname);
        socket.current.on("getMessage", (data) => {
            // console.log(data)
            setMessages(state => [...state, {text:data.text,sender:data.sender}])
        });
    }, [])
    useEffect(() => {
        setMessages([])
        socket.current.emit('join-room', roomName)
    }, [roomName])

    useEffect(() => {
        msgsContainer.current.scrollTop = msgsContainer.current.scrollHeight
    }, [messages])

    return (
        <Box display='flex' sx={{ height: '100vh', p: 4, backgroundColor: 'primary.dark', height: '100%', position: 'relative', flexDirection: 'column', zIndex: 3 }}>
            <Box sx={{ flexGrow: '1', height: '1px' }}>
                <Box ref={msgsContainer} display='flex' sx={{ height: '100%', overflow: 'auto', flexDirection: 'column', alignItems: 'flex-start' }}>
                    {messages.map((message, index) => (
                        <>
                            {message.sender && roomName==='global'&& <Typography variant='body1' fontWeight='600' color="grey.600" sx={{mt:1}}>{message.sender}</Typography>}
                            <Paper key={index} sx={{ p: 1, mb: 1, color: 'white' }}>
                                {message.text}
                            </Paper>
                        </>
                    ))}
                </Box>
            </Box>
            <Box display='flex' sx={{ p: 2 }}>
                <input id='message' autoFocus className='message-input' placeholder='Message' autoComplete='off' value={msg} onChange={(e) => setMsg(e.target.value)} onKeyPress={handleEnter}></input>
                <Button variant='contained' color='secondary' disableElevation disableRipple onClick={submitMsg}>Send</Button>
            </Box>

        </Box>
    )
}

export default Chat
