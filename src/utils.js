import moment from 'moment'

export const formatDate = (dateISO) => {
    const date = moment(dateISO)
    const dateMain = date.utc().format('YYYY-MM-DD')
    const time = date.utc().format('HH:mm:ss')
    return `${dateMain} ${time}`
}

export function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}