import { Button, Container, Paper, TextField, Typography } from '@mui/material'
import { display } from '@mui/system'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
const Profile = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error,setError]=useState('')
    const { userInfo } = useSelector(state => state.userLogin)
    const handleSubmit=()=>{
        setError('updateUser function does not exist')
    }
    useEffect(() => {
        if(!userInfo)return
        setName(userInfo.name)
        setEmail(userInfo.email)
    }, [userInfo])
    return (
        <Container onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
        }} maxWidth='sm' sx={{ }}>
            <Paper sx={{ p: 4, display: 'flex', flexDirection: 'column',gap:'.5rem' }}>
                {error&&<Typography color='error' variant='h3'>{error}</Typography>}
                <input className='message-input' value={name} onChange={(e)=>setName(e.target.value)} />
                <input className='message-input' value={email} onChange={(e)=>setEmail(e.target.value)} />
                <input className='message-input' type='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='password' />
                <input className='message-input' type='password' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} placeholder='confirm password' />
                <Button variant='contained' color='success' sx={{mt:2}} onClick={handleSubmit}>SAVE</Button>
            </Paper>
        </Container>
    )
}

export default Profile
