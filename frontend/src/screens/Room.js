import { Avatar, Box, Paper, styled, Input, Typography, Button, ListItemButton, ListItemIcon, ListItemText, Collapse, List, Menu, MenuItem } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { changeRoom } from '../state/actions/roomActions'
import { logout } from '../state/actions/userActions'

const StyledTextField = styled(Input)(({ theme }) => ({
    width: '100%',
    marginBottom: '15px',
    zIndex: '1',
    '& .MuiInput-input': {
        padding: '10px',
        color: theme.palette.grey[300],
        borderRadius: '5px',
        backgroundColor: theme.palette.primary.dark
    },
    '& .MuiInput-input:focus-within': {
        // backgroundColor:theme.palette.primary.light
    }
}))
const Room = () => {
    let navigate = useNavigate()
    const dispatch = useDispatch()
    const [open, setOpen] = useState(true);
    const { roomName } = useSelector(state => state.roomDetails)
    const [userName, setUserName] = useState()
    const { userInfo } = useSelector(state => state.userLogin)
    const [anchorEl, setAnchorEl] = useState(null);
    const menuOpen = Boolean(anchorEl);
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleClick = () => {
        setOpen(!open);
    };
    const handleLogout = () => {
        dispatch(logout())
    }
    const handleChangeRoom = (room) => {
        dispatch(changeRoom(room))
    }
    useEffect(() => {
        if (!userInfo) navigate('/login')
        else (setUserName(userInfo.name))
    }, [userInfo])

    return (
        <Box className='room-nav' sx={{ p: 4,pt:'50px', backgroundColor: 'primary.main', height: '100%', zIndex: '1' }}>
            <StyledTextField disableUnderline id="search" variant='filled' placeholder='Search...' autoComplete='off' onKeyUp={() => { console.log('hello') }} />
            <Paper sx={{ display: 'flex', p: 2, mb: 2, alignItems: 'center' }}>
                <Avatar sx={{ backgroundColor: 'white' }} variant="rounded" src='/images/poop.png'>
                    {/* PV */}
                </Avatar>
                <Box display='block' sx={{ ml: 1, flexGrow: '1' }}>
                    <Typography variant='body1' fontWeight='700' color='white'>{userName}</Typography>
                    <Typography variant='body1' fontWeight='600'fontSize='.7rem' color='grey.500'>Active</Typography>
                </Box>
                <Typography fontSize='1rem' color='grey.500'
                    id="basic-button"
                    // aria-controls={menuOpen ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    // aria-expanded={menuOpen ? 'true' : undefined}
                    onClick={handleMenu}
                    sx={{cursor:'pointer'}}>
                    <i className="fas fa-ellipsis-h"></i>
                </Typography>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={menuOpen}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={handleClose} sx={{ color: 'grey.500', fontWeight: '600' }}>Profile</MenuItem>
                    <MenuItem onClick={handleLogout} sx={{ color: 'grey.500', fontWeight: '600' }}>Logout</MenuItem>
                </Menu>
            </Paper>
            <Typography color='grey.800' fontWeight='600' onClick={handleClick} sx={{ mt: 4, mb: 1,cursor: 'pointer'}}>
                {open ? <i className="fas fa-chevron-up" /> : <i className="fas fa-chevron-down"></i>}
                ROOMS
            </Typography>
            <Collapse in={open} >
                <Box sx={{ display: 'flex', flexDirection: 'column', pl: 2 }} >
                    <Paper variant='contained' onClick={() => handleChangeRoom('globalanon')} sx={{ p: 1, mb: 1, cursor: 'pointer', background: `${roomName === 'globalanon' ? 'paper' : 'none'}` }}><Typography variant='body1' fontWeight='600' color='grey.400'>Global(Anonymous)</Typography></Paper>
                    <Paper variant='contained' onClick={() => handleChangeRoom('global')} sx={{ p: 1, mb: 1, cursor: 'pointer', background: `${roomName === 'global' ? 'paper' : 'none'}` }}><Typography variant='body1' fontWeight='600' color='grey.400'>Other Global</Typography></Paper>
                </Box>
            </Collapse>
        </Box>
    )
}

export default Room
