import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'




const todoListReducer = (state = {}, action) => {
    return state
}

const userSettingsReducer = (state = {}, action) => {
    return state

}
const appStateReducer = (state = {}, action) => {
    return state
}

const initialState = {
    todoList: {
    },
    userSettings: {
    },
    appState: {
    }
}
const reducers = combineReducers({
    todoList: todoListReducer,
    userSettings: userSettingsReducer,
    appState: appStateReducer
})

const store = createStore(reducers, initialState, composeWithDevTools())

export default store