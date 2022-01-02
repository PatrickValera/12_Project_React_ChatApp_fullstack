import { Avatar, Box, Button, Paper, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { io } from "socket.io-client";

const Chat = () => {
    let navigate = useNavigate()
    const [messages, setMessages] = useState([])
    const [msg, setMsg] = useState("")
    const { userInfo } = useSelector(state => state.userLogin)
    const { roomName } = useSelector(state => state.roomDetails)
    const msgsContainer = useRef()
    const socket = useRef()

    const submitMsg = async () => {
        if (!msg) return
        setMsg('')
        await axios.post('/api/rooms/global', {
            text: msg,
            sender: userInfo.name,
            toRoom: roomName,
            icon:userInfo.icon
        }).then(() => {
            // setMsg('')
        }).catch(er => console.log(er))
    }

    const handleEnter = (e) => {
        if (e.key === 'Enter' && e.shiftKey) {
            return
        }
        else if (e.key === 'Enter') {
            e.preventDefault()
            submitMsg()
        }
    }

    const fetchMsgs = async () => {
        await axios.get(`/api/rooms/${roomName}`).then(({ data }) => {
            setMessages(data)
        }).catch(er => console.log(er))
    }

    useEffect(() => {
        if (!userInfo) navigate('/login')
        socket.current = io(window.location.pathname);
        socket.current.on("getMessage", (data) => {
            setMessages(state => [...state, { text: data.text, sender: data.sender,icon:data.icon }])
        });
    }, [])

    useEffect(() => {
        setMessages([])
        socket.current.emit('join-room', roomName)
        let timer=setTimeout(() => fetchMsgs(), 80)
        // fetchMsgs()
        return (() => { clearTimeout(timer) })
    }, [roomName])

    useEffect(() => {
        msgsContainer.current.scrollTop = msgsContainer.current.scrollHeight
    }, [messages])

    return (
        <Box display='flex' sx={{ height: '100vh', p: 4, backgroundColor: 'primary.dark', height: '100%', position: 'relative', flexDirection: 'column', zIndex: '2', pt: '50px' }}>
            <Box sx={{ flexGrow: '1', height: '1px' }}>
                <Box ref={msgsContainer} display='flex' sx={{ height: '100%', overflow: 'auto', flexDirection: 'column', alignItems: 'flex-start' }}>
                    {messages&&messages.map((message, index) => (
                        <Box key={index} display='flex' sx={{ alignItems: 'center', gap: 2 }}>
                            {roomName==='global'&&<Avatar sx={{ backgroundColor: 'white' }} variant="round" src={`/images/poop.png`}/>}
                            <Box display='block'>
                                {message.sender && roomName === 'global' && <Typography variant='body1' fontWeight='600' color="grey.600" sx={{ mt: 1 }}>{message.sender}</Typography>}
                                <Paper sx={{ p: 1, mb: 1, color: 'white' }}>
                                    <span className='msg'>{message.text}</span>
                                </Paper>
                            </Box>

                        </Box>
                    ))}
                </Box>
            </Box>
            <Box display='flex' sx={{ position: 'relative' }}>
                <textarea id='message' autoFocus className='message-input' placeholder='Message' autoComplete='off' value={msg} onChange={(e) => setMsg(e.target.value)} onKeyPress={handleEnter}></textarea>
                <Button variant='contained' color='secondary' disableElevation disableRipple onClick={submitMsg} sx={{ position: 'absolute', height: '100%', right: '0' }}>Send</Button>
            </Box>

        </Box>
    )
}
const Linebr = () => {
    return (
        <br />
    )
}
export default Chat
