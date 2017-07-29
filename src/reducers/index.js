import { combineReducers } from 'redux'
import dashboardReducers from './dashboard'
import archiveReducers from './archive'

const rootReducer = combineReducers({
  dashboardReducers, archiveReducers
})

export default rootReducer
