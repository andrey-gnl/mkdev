import {
  FETCH_TICKETS_START,
  FETCH_TICKETS_END_SUCCESS,
  FETCH_TICKETS_END_FAIL,
  REMOVE_TASK_START,
  REMOVE_TASK_END_SUCCESS,
  REMOVE_TASK_END_FAIL,
  CHANGE_TASK_STATUS_START,
  CHANGE_TASK_STATUS_END_SUCCESS,
  CHANGE_TASK_STATUS_END_FAIL,
  FETCH_STATUSES_START,
  FETCH_STATUSES_END_SUCCESS,
  FETCH_STATUSES_END_FAIL
} from '../constants'

const initialState = {
  tasks: [],
  statuses: [],
  pendingTasks: false,
  pendingStatuses: false,
  error: ''
}

export default (state = initialState, action) => {
  const { type, tasks, error, id, statuses, status } = action

  switch (type) {
    // all tasks
    case FETCH_TICKETS_START:
      return { ...state, pendingTasks: true }
    case FETCH_TICKETS_END_SUCCESS:
      return { ...state, tasks, pendingTasks: false, error: '' }
    case FETCH_TICKETS_END_FAIL:
      return { ...state, tasks: [], pendingTasks: false, error }

    // single task
    case REMOVE_TASK_START:
      return {
        ...state,
        tasks: state.tasks.map(t => (t.id !== id ? t : { ...t, pendingRemove: true }))
      }
    case REMOVE_TASK_END_SUCCESS:
      return {
        ...state,
        tasks: state.tasks.filter(t => t.id !== id)
      }
    case REMOVE_TASK_END_FAIL:
      console.error('CAN\'T DELETE CARD :(')
      return {
        ...state,
        tasks: state.tasks.map(t => (t.id !== id
          ? t
          : { ...t, pendingRemove: false }))
      }
    case CHANGE_TASK_STATUS_START:
      return {
        ...state,
        tasks: state.tasks.map(t => (t.id !== id
          ? t
          : { ...t, status, oldStatus: t.status, pendingStatus: true }))
      }
    case CHANGE_TASK_STATUS_END_SUCCESS:
      return {
        ...state,
        tasks: state.tasks.map(t =>
          (t.id !== id
            ? t
            : { ...t, status, pendingStatus: false, updatedAt: new Date().toISOString() }))
      }
    case CHANGE_TASK_STATUS_END_FAIL:
      console.error('CAN\'T CHANGE STATUS :(')
      return {
        ...state,
        tasks: state.tasks.map(t => (t.id !== id
          ? t
          : { ...t, status: t.oldStatus, pendingStatus: false }))
      }

    // all statuses
    case FETCH_STATUSES_START:

      return {
        ...state,
        pendingStatuses: true
      }
    case FETCH_STATUSES_END_SUCCESS:
      return {
        ...state,
        pendingStatuses: false,
        statuses: statuses.filter(s => s.active).sort((curr, next) => curr.order - next.order)
      }
    case FETCH_STATUSES_END_FAIL:
      console.error('CAN\'T FETCH STATUSES :(')
      return {
        ...state,
        pendingStatuses: false,
        statuses: []
      }
  }

  return state
}
