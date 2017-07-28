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
  FETCH_STATUSES_END_FAIL,
  FETCH_ARCHIVE_TICKETS_START,
  FETCH_ARCHIVE_TICKETS_END_SUCCESS,
  FETCH_ARCHIVE_TICKETS_END_FAIL
} from '../constants'
import {handleErrors} from '../utils'

export function fetchTasks() {

  return (dispatch) => {
    dispatch({
      type: FETCH_TICKETS_START
    })

    fetch('api/tickets/')
      .then(handleErrors)
      .then((response) => response.json())
      .then((tasks) => dispatch({
          type: FETCH_TICKETS_END_SUCCESS,
          tasks
        })
      )
      .catch((error) => dispatch({
        type: FETCH_TICKETS_END_FAIL,
        error
      }))

  }
}

export function fetchTasksByStatus(status) {

  return (dispatch) => {
    dispatch({
      type: FETCH_ARCHIVE_TICKETS_START
    })

    fetch(`/api/tickets/archive/`)
      .then(handleErrors)
      .then((response) => response.json())
      .then((tasks) => dispatch({
          type: FETCH_ARCHIVE_TICKETS_END_SUCCESS,
          tasks
        })
      )
      .catch((error) => dispatch({
        type: FETCH_ARCHIVE_TICKETS_END_FAIL,
        error
      }))

  }
}

export function removeTask(id) {
  return (dispatch) => {

    dispatch({
      type: REMOVE_TASK_START,
      id
    })

    fetch(`api/tickets/${id}`, {method: 'DELETE'})
      .then((response) => response.json())
      .then((response) => {
          if (response.status === 'ok') {
            return dispatch({
              type: REMOVE_TASK_END_SUCCESS,
              id
            })
          }
          return dispatch({
            type: REMOVE_TASK_END_FAIL,
            id
          })
        }
      )
  }
}

export function changeStatus(id, status) {
  return (dispatch) => {
    dispatch({
      type: CHANGE_TASK_STATUS_START,
      id, status
    })

    fetch(`api/tickets/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({status})
      })
      .then((response) => response.json())
      .then((response) => {
        if(response.status === 'ok') {
          return dispatch({
            type: CHANGE_TASK_STATUS_END_SUCCESS,
            id, status
          })
        }

        return dispatch({
          type: CHANGE_TASK_STATUS_END_FAIL,
          id, status
        })
      })
  }
}

export function fetchStatuses() {
  return (dispatch) => {

    dispatch({
      type: FETCH_STATUSES_START
    })

    fetch('api/statuses/')
      .then(handleErrors)
      .then((response) => response.json())
      .then((statuses) => dispatch({
          type: FETCH_STATUSES_END_SUCCESS,
          statuses
        })
      )
      .catch((error) => dispatch({
        type: FETCH_STATUSES_END_FAIL,
        error
      }))
  }
}