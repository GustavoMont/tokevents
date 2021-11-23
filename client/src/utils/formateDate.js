import moment from 'moment';

export const formateDate = (data) =>{
    const noTimeZone = data.replace(/Z.*/i, '')
    return moment(noTimeZone).format('DD/MM/YYYY HH:mm')
}