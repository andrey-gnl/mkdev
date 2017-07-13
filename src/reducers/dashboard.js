import {
    FETCH_TICKETS_START,
    FETCH_TICKETS_END_SUCCESS,
    FETCH_TICKETS_END_FAIL
} from '../constants'

const initialState = {
    tasks: [],
    pending: false,
    error: ''
}

export default (state = initialState, action) => {
    const {type, tasks, error} = action

    switch (type) {
        case FETCH_TICKETS_START:
            return Object.assign({}, state, {pending: true})
        case FETCH_TICKETS_END_SUCCESS:
            return Object.assign({}, state, {tasks, pending: false})
        case FETCH_TICKETS_END_FAIL:
            return Object.assign({}, state, {tasks: [], pending: false, error})
    }

    return state
};