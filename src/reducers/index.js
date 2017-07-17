import {combineReducers} from 'redux'
import dashboardReducers from './dashboard'

const rootReducer = combineReducers({
  dashboardReducers,
  columns: () => ([
    {name: 'TODO', status: 1},
    {name: 'PROGRESS', status: 2},
    {name: 'DONE', status: 3}
  ])
})

export default rootReducer
