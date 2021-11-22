export const handleLogin = async (e) =>{
    e.preventDefault()
    const form = e.target
    const login = form.login.value
    const senha = form.senha.value
    const body = JSON.stringify({login, senha})

    console.log(form.action)

    try {
        const query = await fetch('/auth/login',{
            headers:{
                'Content-Type': 'application/json'
            },
            method: form.getAttribute('method'),
            body
        })
        const response = await query.json()
        console.log(response)
    } catch (error) {
        console.error(error);
    }

}

export const handleToken = async (token)=>{
    const homeResponse = await fetch("/home", {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
            'auth': token
        }
    })
    const jsonRes = await homeResponse.json()

    return jsonRes.login
}