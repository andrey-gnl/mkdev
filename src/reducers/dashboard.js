import {
    FETCH_TICKETS_START,
    FETCH_TICKETS_END_SUCCESS,
    FETCH_TICKETS_END_FAIL,
    REMOVE_TASK_START,
    REMOVE_TASK_END_SUCCESS,
    REMOVE_TASK_END_FAIL
} from '../constants'
import _ from 'lodash'

const initialState = {
    tasks: [],
    pending: false,
    error: ''
}

export default (state = initialState, action) => {
    const {type, tasks, error, id} = action

    switch (type) {
        case FETCH_TICKETS_START:
            return Object.assign({}, state, {pending: true})
        case FETCH_TICKETS_END_SUCCESS:
            return Object.assign({}, state, {tasks, pending: false, error: ''})
        case FETCH_TICKETS_END_FAIL:
            return Object.assign({}, state, {tasks: [], pending: false, error})

        case REMOVE_TASK_START:
            const stateWithPendingTask = _.cloneDeep(state)
            stateWithPendingTask.tasks.forEach((el) => {
                if(el.id === id) {
                    el.pending = true
                }
            })
            return Object.assign({}, state,  stateWithPendingTask)
        case REMOVE_TASK_END_SUCCESS:
            const stateWithoutTask = Object.assign({}, state);
            stateWithoutTask.tasks = state.tasks.filter((el) => el.id !== id)
            return Object.assign({}, state, stateWithoutTask)
        case REMOVE_TASK_END_FAIL:
            const stateWithoutPendingTask = _.cloneDeep(state)
            stateWithoutPendingTask.tasks.forEach((el) => {
                if(el.id === id) {
                    el.pending = false
                }
            })
            console.error(`CAN'T DELETE CARD :(`);
            return Object.assign({}, state, stateWithoutPendingTask)
    }

    return state
};