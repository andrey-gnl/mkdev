import {
  FETCH_ARCHIVE_TICKETS_START,
  FETCH_ARCHIVE_TICKETS_END_SUCCESS,
  FETCH_ARCHIVE_TICKETS_END_FAIL,
  ARCHIVE_REMOVE_TASK_START,
  ARCHIVE_REMOVE_TASK_END_SUCCESS,
  ARCHIVE_REMOVE_TASK_END_FAIL,
} from '../constants'

const initialState = {
  tasks: [],
  pendingTasks: false,
  error: ''
}

export default (state = initialState, action) => {
  const { type, tasks, error, id } = action

  switch (type) {
    // all tasks
    case FETCH_ARCHIVE_TICKETS_START:
      return { ...state, pendingTasks: true }
    case FETCH_ARCHIVE_TICKETS_END_SUCCESS:
      return { ...state, tasks, pendingTasks: false, error: '' }
    case FETCH_ARCHIVE_TICKETS_END_FAIL:
      return { ...state, tasks: [], pendingTasks: false, error }
    // single task
    case ARCHIVE_REMOVE_TASK_START:
      return {
        ...state,
        tasks: state.tasks.map(t => (t.id !== id ? t : { ...t, pendingRemove: true }))
      }
    case ARCHIVE_REMOVE_TASK_END_SUCCESS:
      return {
        ...state,
        tasks: state.tasks.filter(t => t.id !== id)
      }
    case ARCHIVE_REMOVE_TASK_END_FAIL:
      console.error('CAN\'T DELETE CARD :(')
      return {
        ...state,
        tasks: state.tasks.map(t => (t.id !== id
          ? t
          : { ...t, pendingRemove: false }))
      }
  }

  return state
}
