import { useNavigate, Link, Navigate } from 'react-router-dom'
import { Box, styled, Input, Button,Container, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../state/actions/userActions'

const StyledInput = styled(Input)(({ theme }) => ({
    width: '100%',
    // marginBottom: '10px',
    zIndex: '2',
    fontSize:'1rem',
    '& .MuiInput-input': {
        padding: '10px',
        color: theme.palette.grey[300],
        borderRadius: '5px',
        backgroundColor: theme.palette.primary.dark
    },
    '& .MuiInput-input:focus-within': {
        backgroundColor:theme.palette.primary.main
    }

}))


const Register = () => {
    let navigate=useNavigate()
    // const { userInfo,error:loginError } = useSelector(state => state.userLogin)
    const [email, setEmail] = useState("")
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error,setError]=useState('')
    const {error:registerError,loading}=useSelector(state=>state.userRegister)
    const {userInfo}=useSelector(state=>state.userLogin)
    const dispatch=useDispatch()
    const handleClick = () => {
        setError('')
        if(confirmPassword===password&&email&&userName)
        dispatch(register(email, password, userName))
        else{
            if(confirmPassword!==password)setError('check password')
            else setError('Error')
        }
    }
    useEffect(()=>{
        if(userInfo)navigate('/')
    },[userInfo])

    return (
        <Box display='flex' autoComplete='off' sx={{ width: '100vw', height: '100vh', backgroundColor: 'primary.dark', alignItems: 'center' }}>
            <Container maxWidth='sm' component='form' sx={{ backgroundColor: 'primary.light', height:{xs:'100vh',sm:'600px'}, justifyContent:'center',alignItems:'center',gap:'10px', display:'flex',flexDirection:'column' }}>
            <Typography color='white' fontFamily='Russo one' fontSize='4rem' sx={{letterSpacing:'.1rem'}}>Chatcord</Typography>
                {/* <Typography color='grey.500' variant='body1' sx={{mb:4,mt:'-20px'}}>Discord but shit</Typography> */}
                {registerError&&<Typography color='error'>{registerError}</Typography>}
                {error&&<Typography color='error'>{error}</Typography>}
                <StyledInput id='test' placeholder='email' disableUnderline autoComplete='off' value={email} type='email' onChange={(e) => setEmail(e.target.value)} />
                <StyledInput id='test' placeholder='username' disableUnderline autoComplete='off' value={userName} type='text' onChange={(e) => setUserName(e.target.value)} />
                <StyledInput placeholder='password' disableUnderline autoComplete='off' value={password} type='password' onChange={(e) => setPassword(e.target.value)} />
                <StyledInput placeholder='confirm password' disableUnderline autoComplete='off' value={confirmPassword} type='password' onChange={(e) => setConfirmPassword(e.target.value)} />
                <Button color='primary' variant='contained' disableRipple disableElevation onClick={handleClick} sx={{mt:'40px',mb:'10px'}}>Register</Button>
                <Link to="/login" className='router-link'> <Typography color='white' sx={{cursor:'pointer'}} gutterBottom>Or Sign In</Typography></Link>
            </Container>
        </Box>
    )
}

export default Register
