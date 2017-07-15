import {
    REMOVE_TASK_START,
    REMOVE_TASK_END_SUCCESS,
    REMOVE_TASK_END_FAIL
} from '../constants'

const initialState = {
    pending: false,
    error: '',
    items: [],
    id: ''
}

export default (state = initialState, action) => {
    const {type, tasks, error, id} = action

    switch(type) {
        case REMOVE_TASK_START:
            return Object.assign({}, state, {pending: true, id})
        case REMOVE_TASK_END_SUCCESS:
            return Object.assign({}, state, {tasks, pending: false, error: '', id: ''})
        case REMOVE_TASK_END_FAIL:
            return Object.assign({}, state, {pending: false, error, id: ''})

    }

    return state
}