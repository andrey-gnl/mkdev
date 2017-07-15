import {combineReducers} from 'redux'
import dashboardReducers from './dashboard'
import taskReducers from './task'

const rootReducer = combineReducers({
    dashboardReducers, taskReducers
})

export default rootReducer
