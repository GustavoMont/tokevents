const saveGoHome = (resultado) => {
    sessionStorage.setItem('@tokevents', JSON.stringify(resultado))
    window.location.href = '/home'
}
export const handleLogin  = async (e) =>{
        e.preventDefault()
        const form = e.target

        let {login, password} = form
        login = login.value
        password = password.value
        const body = JSON.stringify( {
            login, 
            password
        })

        const loginRes = await fetch('/auth/login', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body
        })

        const resultado = await loginRes.json()
        if (resultado.erro) {
            alert(resultado.message)
            return
        }
        saveGoHome(resultado)
}


export const handleSignIn = async (e) => {
    e.preventDefault()
    const form = e.target
    let {email, user_name, nome, 
        password, confirm} = form
    
    if (password.value !== confirm.value) {
        alert('As senhas não estão iguais')
        return
    }
    email = email.value
    user_name = user_name.value
    nome = nome.value
    password = password.value
    const body = JSON.stringify({
        email, user_name, nome,
        password
    })
    const signInRes = await fetch("/auth/signIn", {
        method: "POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body
    })

    const resultado = await signInRes.json()
    if (resultado.erro) {
        alert(resultado.message)
        return
    }
    saveGoHome(resultado)
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
    console.log(jsonRes);
    return jsonRes.login
}