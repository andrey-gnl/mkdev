import {
    FETCH_TICKETS_START,
    FETCH_TICKETS_END_SUCCESS,
    FETCH_TICKETS_END_FAIL
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