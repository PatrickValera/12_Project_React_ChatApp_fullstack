import { createStore, combineReducers,applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import {userLoginReducer,userRegisterReducer} from './reducer/userReducer'
import {roomDetailsReducers} from './reducer/roomDetailsReducers'

const initialState = {

}
const reducers = combineReducers({
    userLogin:userLoginReducer,
    roomDetails:roomDetailsReducers,
    userRegister:userRegisterReducer
})

const middleware=[thunk]

const store=createStore(reducers,initialState, composeWithDevTools(applyMiddleware(...middleware)))


export default store