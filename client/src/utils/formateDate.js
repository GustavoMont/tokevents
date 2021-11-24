import moment from 'moment';

export const formateDate = (data) =>{
    if (!data) {
        return
    }
    const noTimeZone = data.replace(/Z.*/i, '') 
    
    return moment(noTimeZone).format('DD/MM/YYYY HH:mm')
}

export const formateToDB = (data, hora) => `${data}T${hora}:00.000+00:00`