import {
    FETCH_TICKETS_START,
    FETCH_TICKETS_END_SUCCESS,
    FETCH_TICKETS_END_FAIL,
    REMOVE_TASK_START,
    REMOVE_TASK_END_SUCCESS,
    REMOVE_TASK_END_FAIL,
} from '../constants'
import {handleErrors} from '../utils'

export function fetchTasks() {

    return (dispatch) => {
        dispatch({
            type: FETCH_TICKETS_START
        })

        setTimeout(() => {
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
        },1000)

    }
}

export function removeTask(id) {
   return (dispatch) => {

       dispatch({
           type: REMOVE_TASK_START,
           id,
       })

       setTimeout(() => {
           fetch(`api/tickets/${id}`, { method: 'DELETE' })
               .then(handleErrors)
               .then((response) => response.json())
               .then((tasks) => dispatch({
                       type: REMOVE_TASK_END_SUCCESS,
                       tasks
                   })
               )
               .catch((error) => dispatch({
                   type: REMOVE_TASK_END_FAIL,
                   error
               }))
       }, 1000)
   }
}