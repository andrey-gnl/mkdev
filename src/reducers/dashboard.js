import {
  FETCH_TICKETS_START,
  FETCH_TICKETS_END_SUCCESS,
  FETCH_TICKETS_END_FAIL,
  REMOVE_TASK_START,
  REMOVE_TASK_END_SUCCESS,
  REMOVE_TASK_END_FAIL,
  CHANGE_TASK_STATUS
} from '../constants'
import _ from 'lodash'

const initialState = {
  tasks: [],
  pending: false,
  error: ''
}

export default (state = initialState, action) => {
  const {type, tasks, error, id, status} = action

  switch (type) {
    // all tasks
    case FETCH_TICKETS_START:
      return {...state, pending: true}
    case FETCH_TICKETS_END_SUCCESS:
      return {...state, tasks, pending: false, error: ''}
    case FETCH_TICKETS_END_FAIL:
      return {...state, tasks: [], pending: false, error}

    // single task
    case REMOVE_TASK_START:
      return {
        ...state,
        tasks: state.tasks.map(t => t.id !== id ? t : {...t, pending: true})
      }
    case REMOVE_TASK_END_SUCCESS:
      return {
        ...state,
        tasks: state.tasks.filter(t => t.id !== id)
      }
    case REMOVE_TASK_END_FAIL:
      console.error(`CAN'T DELETE CARD :(`)
      return {
        ...state,
        tasks: state.tasks.map(t => t.id !== id ? t : {...t, pending: false})
      }
    case CHANGE_TASK_STATUS:
      return {
        ...state,
        tasks: state.tasks.map(t => t.id !== id ? t : {...t, status})
      }
  }

  return state
};