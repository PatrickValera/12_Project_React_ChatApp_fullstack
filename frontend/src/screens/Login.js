import { useNavigate, Link } from 'react-router-dom'
import { Box, styled, Input, Button,Container, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../state/actions/userActions'

const StyledInput = styled(Input)(({ theme }) => ({
    width: '100%',
    marginBottom: '25px',
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


const Login = () => {
    let navigate = useNavigate()
    let dispatch = useDispatch()
    const { userInfo,error:loginError } = useSelector(state => state.userLogin)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error,setError]=useState("")

    const handleClick = () => {
        setError('')
        dispatch(login(email, password))
    }
    const loadDemo=()=>{
        setEmail('poopoo@toilet.com')
        setPassword('pooplol')
    }
    useEffect(() => {
        if (userInfo) {
            navigate('/')
        }
        if(loginError){
            setError("Try again shithead")
        }
    }, [userInfo,loginError])
    return (
        <Box display='flex' autoComplete='off' sx={{ width: '100vw', height: '100vh', backgroundColor: 'primary.dark', alignItems: 'center' }}>
            <Container maxWidth='sm' component='form' sx={{ backgroundColor: 'primary.light', height:{xs:'100vh',sm:'500px'}, justifyContent:'center', display:'flex',flexDirection:'column' }}>
                {error&&<Typography color='error'>{error}</Typography>}
                <form  autocomplete="off">
                <StyledInput id='test' placeholder='username' disableUnderline autoComplete='off' value={email} type='email' onChange={(e) => setEmail(e.target.value)} />
                <StyledInput placeholder='password' disableUnderline autoComplete='off' value={password} type='password' onChange={(e) => setPassword(e.target.value)} />
                </form>
                <Button color='primary' variant='contained' disableRipple disableElevation onClick={handleClick}>Login</Button>
                <Typography color='secondary' onClick={loadDemo} sx={{cursor:'pointer'}}>Load demo user</Typography>
                <Link to="/register" className='router-link'> <Typography color='white' onClick={loadDemo} sx={{cursor:'pointer'}}>Sign Up</Typography></Link>
            </Container>
        </Box>
    )
}

export default Login
