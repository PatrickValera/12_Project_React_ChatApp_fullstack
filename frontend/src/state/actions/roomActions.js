import {ROOM_CHANGE_REQUEST,ROOM_CHANGE_SUCCESS} from '../constants/roomConstants'

export const changeRoom=(room)=>(dispatch)=>{
    dispatch({
        type: ROOM_CHANGE_REQUEST 
    })
    dispatch({
        type: ROOM_CHANGE_SUCCESS,
        payload:room
    })
}