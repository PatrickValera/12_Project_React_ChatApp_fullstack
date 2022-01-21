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
    const element = useRef()
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
            // console.log(data+"THIS IS MESSAGES")
            setMessages(data)
        }).then(()=>{      
            msgsContainer.current.scrollTop = msgsContainer.current.scrollHeight}
        ).catch(er => console.log(er))
    }

    useEffect(() => {
        if (!userInfo){ 
            console.log('no userinfo. navigating to login screen')
            navigate('/login')
        }
        console.log("CONNECTING")
        socket.current = io(window.location.pathname);
        socket.current.on("getMessage", (data) => {
            // console.log(data+'THIS IS NEW MESSAGES')
            setMessages((state) => [...state, { text: data.text, sender: data.sender,icon:data.icon }])
        });
    }, [userInfo])

    useEffect(() => {
        setMessages([])
        socket.current.emit('join-room', roomName)
        let timer=setTimeout(() => fetchMsgs(), 80)
        return (() => { clearTimeout(timer) })
    }, [roomName])

    useEffect(() => {
    if(isInViewport()){
        // console.log("NEW IN VIEW")
    }
    }, [messages])

    useEffect(() => {
        msgsContainer.current.scrollTop = msgsContainer.current.scrollHeight

        console.log('IN CHAT')
    }, [])
    function isInViewport() {
        const rect = element.current.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    return (
        <Box display='flex' sx={{ height: '100vh', p: 4, backgroundColor: 'primary.dark', height: '100%', position: 'relative', flexDirection: 'column', zIndex: '2', pt: '50px' }}>
            <Box sx={{ flexGrow: '1', height: '1px' }}>
                <Box ref={msgsContainer} display='flex' sx={{ height: '100%', overflow: 'auto', flexDirection: 'column', alignItems: 'flex-start' }}>
                    {messages&&messages.map((message) => (
                        <Box key={Math.floor(Math.random()*100000)} display='flex' sx={{ alignItems: 'center', gap: 2 }}>
                            {roomName==='global'&&<Avatar sx={{ backgroundColor: 'white' }} variant="rounded" />}
                            <Box display='block'>
                                {message.sender && roomName === 'global' && <Typography variant='body1' fontWeight='600' color="grey.600" sx={{ mt: 1 }}>{message.sender}</Typography>}
                                <Paper sx={{ p: 1, mb: 1, color: 'white' }}>
                                    <span className='msg'>{message.text}</span>
                                </Paper>
                            </Box>
                        </Box>
                    ))}
                    <div className="element" ref={element}></div>
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
