import moment from 'moment';

export const formateDate = (dateISO) => {
    const date = moment(dateISO);
    const dateMain = date.utc().format('YYYY-MM-DD');
    const time = date.utc().format('HH:mm:ss');
    return `${dateMain} ${time}`;
};