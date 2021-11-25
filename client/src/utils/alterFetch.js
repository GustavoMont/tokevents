export const alterFetch = async (action ,token, id, method, bodyForm) =>{
    const body = bodyForm || JSON.stringify({
        id,
        user_id: token
    })
    const req = await fetch(action, {
        method,
        headers:{
            'Content-Type': 'application/json',
            auth: `Bearer ${token}`
        },
        body
    })
    const resultado = await req.json()
    return resultado;
}