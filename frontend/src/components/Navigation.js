import React,{useState,useEffect} from 'react'
import {Box,Paper,Button} from '@mui/material'
const Navigation = () => {
    const [rooms,setRooms]=useState(['room1','room1','room1','room1','room1','room1',])
    const mockData=['room1','room1','room1','room1','room1','room1',]
    useEffect(()=>{
        setRooms(mockData)
    },[])
    return (
        <Box display='flex' sx={{flexDirection:'column',p:'10px',backgroundColor:'primary.light', height:'100%'}}>
            {rooms.map((data,index)=>(
                <Button key={index} variant='contained' sx={{p:'10px',mb:'10px'}}>NA</Button>
            ))}
        </Box>
    )
}

export default Navigation
