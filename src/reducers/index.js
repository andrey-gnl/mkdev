import {combineReducers} from 'redux'
import dashboardReducers from './dashboard'
import taskReducers from './task'

const rootReducer = combineReducers({
    dashboardReducers, taskReducers,
    columns: () => ([
        { name: 'TODO', status: 1},
        { name: 'PROGRESS', status: 2},
        { name: 'DONE', status: 3}
    ])
})

export default rootReducer
