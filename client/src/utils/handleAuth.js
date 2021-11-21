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