import { useNavigate } from 'react-router-dom'
import { Box, styled, Input, Button } from '@mui/material'
import React from 'react'

const StyledInput = styled(Input)(({ theme }) => ({
    width: '100%',
    marginBottom:'25px',
    zIndex:'2',
    // '& .MuiInputLabel-root': {
    //     color: theme.palette.grey[100],
    // },
    '& .MuiInput-input': {
        padding:'10px',
        color: theme.palette.grey[300],
        borderRadius: '5px',
        backgroundColor:theme.palette.primary.dark
    },
    '& .MuiInput-input:focus-within': {
        // backgroundColor:theme.palette.primary.light
    }

}))


const Login = () => {
    let navigate=useNavigate()
    const handleClick=()=>{
        navigate('/')
    }
    return (
        <Box display='flex' sx={{width:'100vw', height:'100vh', backgroundColor:'primary.dark',alignItems:'center'}}>
            <Box display='block' sx={{margin:'0 auto', padding:'50px', backgroundColor:'primary.light'}}>
                <StyledInput placeholder='username' autoComplete='off'/>
                <StyledInput placeholder='password' autoComplete='off'/>
                <Button color='primary' variant='contained' onClick={handleClick}>Login</Button>
            </Box>
        </Box>
    )
}

export default Login
