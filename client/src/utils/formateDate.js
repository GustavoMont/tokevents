import moment from 'moment';
// Formata data para ser mostrada ao usuário
export const formateDate = (data) =>{
    if (!data) {
        return
    }
    const noTimeZone = data.replace(/Z.*/i, '') 
    
    return moment(noTimeZone).format('DD/MM/YYYY HH:mm')
}
// Formata data para o banco de dados
export const formateToDB = (data, hora) => `${data}T${hora}:00.000+00:00`