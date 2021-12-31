import { createStore, combineReducers,applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import {userLoginReducer} from './reducer/userReducer'


const initialState = {

}
const reducers = combineReducers({
    userLogin:userLoginReducer,
})

const middleware=[thunk]

const store=createStore(reducers,initialState, composeWithDevTools(applyMiddleware(...middleware)))


export default store