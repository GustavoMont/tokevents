// Faz as requisições para fazer as alterações nos eventos (remover, concluir, e editar)
export const alterFetch = async (action ,token, id, method, bodyForm) =>{
    // Cada parâmetro recebido vai dizer o que a requisição deve fazer
    // Caso não tenha o parâmetro bodyForm ele atribui esse JSON padrão
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