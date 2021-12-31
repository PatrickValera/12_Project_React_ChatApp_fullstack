import { Avatar, Box, Paper, styled, Input } from '@mui/material'
import React from 'react'

const StyledTextField = styled(Input)(({ theme }) => ({
    width: '100%',
    marginBottom:'15px',
    zIndex:'6',
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
const Room = () => {
    return (
        <Box className='room-nav' sx={{ p: 3, backgroundColor: 'primary.main', height: '100%' }}>
            <StyledTextField disableUnderline id="search" variant='filled' placeholder='Search...' autoComplete='off' onKeyUp={()=>{console.log('hello')}}/>
            <Paper sx={{ display: 'flex', p: 1 }}>
                <Avatar sx={{}} variant="rounded">
                    PV
                </Avatar>
            </Paper>
        </Box>
    )
}

export default Room
