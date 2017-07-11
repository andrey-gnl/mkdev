import { DELETE } from '../constants';

export function deleteTicket(id) {
    return {
        type: DELETE,
        id
    }
}