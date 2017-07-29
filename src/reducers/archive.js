import {
  FETCH_ARCHIVE_TICKETS_START,
  FETCH_ARCHIVE_TICKETS_END_SUCCESS,
  FETCH_ARCHIVE_TICKETS_END_FAIL
} from '../constants'

const initialState = {
  tasks: [],
  pendingTasks: false,
  error: ''
}

export default (state = initialState, action) => {
  const { type, tasks, error } = action

  switch (type) {
    // all tasks
    case FETCH_ARCHIVE_TICKETS_START:
      return { ...state, pendingTasks: true }
    case FETCH_ARCHIVE_TICKETS_END_SUCCESS:
      return { ...state, tasks, pendingTasks: false, error: '' }
    case FETCH_ARCHIVE_TICKETS_END_FAIL:
      return { ...state, tasks: [], pendingTasks: false, error }
  }

  return state
}
